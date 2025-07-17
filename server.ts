import express from 'express'
import config from './config/config'
import mongoose from 'mongoose'
import { router } from './routes/helperRoutes'
//import { createUser } from './example'
const app = express()

app.use(express.json())

mongoose
  .connect(config.mongo_url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err))

// createUser()
app.use('/helpers', router)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
