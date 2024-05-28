import { pool } from '../config/db.js'

const addAccountQueries = async(number, balance) =>{
    try {
        const sql = {
            text: 'INSERT INTO account (number_account, balance) VALUES ($1, $2) RETURNING *',
            values: [number, balance]
        }
        const response = await pool.query(sql)
        if(response.rowCount > 0){
            return response.rows
        }else{
            return new Error('Error al insertar')
        }
    } catch (error) {
        console.log("Error Code: ", error.code, "Error Message: ", error.message);
    }
}

export {
    addAccountQueries
}

