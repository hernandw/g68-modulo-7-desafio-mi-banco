import express from 'express'
import { home, addAccount } from '../controllers/controller.js'
const router = express.Router()

router.get('/', home)

router.post('/addaccount', addAccount)

export default router