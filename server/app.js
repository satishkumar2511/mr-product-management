import express from 'express'
import cors from 'cors'
import users from './routes/users.js'
import upload from './routes/upload.js'
import auth from './routes/auth.js'
import mr from './routes/mr.js'
import doctor from './routes/doctor.js'
import party from './routes/party.js'
import product from './routes/product.js'
import fileUpload from './routes/fileUpload.js'
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const PORT = 3001
app.use(cors())

app.use(express.json())

// Load the /posts routes
app.use('/users', users)

app.use('/upload', upload)

app.use('/auth', auth)

app.use('/mr', mr)

app.use('/doctor', doctor)

app.use('/party', party)

app.use('/product', product)

app.use('/fileUpload', fileUpload)
// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send('Uh oh! An unexpected error occured.')
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
