import { addAccountQueries } from '../models/queries.js'

export const home = (req, res)=>{
    res.send('Hello World desde controller')
}

export const addAccount = async(req, res)=>{
try {
    const {number, balance} = req.body
    
    await addAccountQueries(number, balance)
    res.send('cuenta insertada')
} catch (error) {
    console.log( "Error Message:", error.message);
}
}

