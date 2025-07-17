import express from 'express'
import {
  getAHelper,
  getAllHelpers,
  updateHelper,
  deleteHelper,
  addHelper,
} from '../service/helperFunctions'
export const router = express.Router()

router.get('/get', getAllHelpers)
router.post('/add', addHelper)
router.put('/update/:id', updateHelper)
router.delete('/delete/:id', deleteHelper)
router.get('/get/:id', getAHelper)
