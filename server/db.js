import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGODB_URI || ''

const client = new MongoClient(connectionString)

let conn
try {
  conn = await client.connect()
  console.log('connected to database successfully..!')
} catch (e) {
  console.log('Error occured while connect to database')
  console.log(e)
}

const db = client.db('product_management');//conn.db('product_management')//('test_db')

export default db
