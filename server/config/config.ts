import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  mongo_url: string
  cloud_name:string
  api_key:string
  api_secret:string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  mongo_url: process.env.MONGO_URL || '',
  cloud_name:process.env.CLOUD_NAME || '',
  api_key:process.env.API_KEY || '',
  api_secret:process.env.API_SECRET || ''
}

export default config
