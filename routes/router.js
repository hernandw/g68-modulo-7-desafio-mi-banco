import express from 'express'
import { home, addAccount, addTransfer } from '../controllers/controller.js'
const router = express.Router()

router.get('/', home)

router.post('/addaccount', addAccount)

router.post('/transfer', addTransfer)

export default router