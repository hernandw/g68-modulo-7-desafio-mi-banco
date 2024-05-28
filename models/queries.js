import { pool } from "../config/db.js";

const addAccountQueries = async (number, balance) => {
  try {
    const sql = {
      text: "INSERT INTO account (number_account, balance) VALUES ($1, $2) RETURNING *",
      values: [number, balance],
    };
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return response.rows;
    } else {
      return new Error("Error al insertar");
    }
  } catch (error) {
    console.log("Error Code: ", error.code, "Error Message: ", error.message);
  }
};

const addTransferQueries = async (
  description,
  amount,
  debit_account,
  credit_account
) => {
  //agregar a la cuenta transferencia
  const newTranfer = {
    text: "INSERT INTO tranfers (description, amount, debit_account, credit_account) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [description, amount, debit_account, credit_account],
  };

  //actualizar cuenta de origen
  const updateOrigin = {
    text: "UPDATE account SET balance = balance - $1 WHERE number_account = $2 RETURNING *",
    values: [amount, debit_account],
  };

  //actualizar cuenta de destino
  const updateDestination = {
    text: "UPDATE account SET balance = balance + $1 WHERE number_account = $2 RETURNING *",
    values: [amount, credit_account],
  };

  try {
    await pool.query("begin");
    const response = await pool.query(newTranfer);
    const debitar = await pool.query(updateOrigin);
    const creditar = await pool.query(updateDestination);
    await pool.query("commit");
    console.log("Transaccion realizada correctamente");
    console.log("ultima transaccion", response.rows[0]);
  } catch (error) {
    await pool.query("rollback");
    console.log("Error Code:", error.code, "Error Message:", error.message);
  }
};

export { addAccountQueries, addTransferQueries };
