import express from 'express'
import {
  getAHelper,
  getAllHelpers,
  updateHelper,
  deleteHelper,
  addHelper,
  getSpecificHelpers,
} from '../service/helperFunctions'
import { upload } from '../service/multer'
export const router = express.Router()

router.get('/get', getAllHelpers)
router.post('/add', upload.any(), addHelper)
router.put('/update/:id', upload.any(), updateHelper)
router.delete('/delete/:id', deleteHelper)
router.get('/get/:id', getAHelper)
router.get('/getspecificusers/',getSpecificHelpers)
