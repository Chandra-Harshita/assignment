import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  mongo_url: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  mongo_url: process.env.MONGO_URL || '',
}

export default config
