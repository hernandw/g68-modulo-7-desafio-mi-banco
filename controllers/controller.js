import { addAccountQueries, addTransferQueries } from "../models/queries.js";

export const home = (req, res) => {
  res.send("Hello World desde controller");
};

export const addAccount = async (req, res) => {
  try {
    const { number, balance } = req.body;

    await addAccountQueries(number, balance);
    res.send("cuenta insertada");
  } catch (error) {
    console.log("Error Message:", error.message);
  }
};

export const addTransfer = async (req, res) => {
  try {
    const { description, amount, debit_account, credit_account } = req.body;
    const result = await addTransferQueries(description, amount, debit_account, credit_account);
    res.send(result);
  } catch (error) {
    console.log("Error Message:", error.message);
  }
};
