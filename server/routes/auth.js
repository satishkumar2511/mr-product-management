import express from 'express'
import db from '../db.js'
import mongo from 'mongodb'
import jwt from 'jsonwebtoken'
import cron from 'node-cron'
import { VerifyToken } from '../helper/verifyToken.js'
import dotenv from 'dotenv'
import { mailService } from '../services/mailService.js'

dotenv.config()

const secretKey = process.env.SECRETKEY

const router = express.Router()

const User = db.collection('user_master')

// API endpoints
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  let query = {
    $and: [
      {
        user_name: email
      },
      {
        password:password
      }
    ]
  }
  // Search for the user in the database
  try {
    const user = await User.findOne(query)
    if (!user) {
      console.log("user is not found");
      return res.status(401).send('Unauthorized')
    }
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: '6h',
    })

    res.status(200).send({ message: 'Login successful', user, token })
  } catch (err) {
    return res.status(500).send('Internal Server Error')
  }
})

router.get('/verifyToken', VerifyToken, (req, res) => {
  // If the middleware passes, the user is authenticated
  const username = req.user.id // Access the user's information

  // Your logic for handling the protected resource here
  res.json({ message: `Welcome, ${username}! This is a protected resource.` })
})

// Get user by token
router.get('/userByToken', VerifyToken, async (req, res) => {
  const user_id = req.user.id
  let collection = db.collection('users')
  try {
    let o_id = new mongo.ObjectId(user_id)

    let query = { _id: o_id }

    let result = await collection.findOne(query)

    if (!result) {
      res.sendStatus(404)
    } else res.send(result)
  } catch (err) {
    res.sendStatus(404)
  }
})

router.post('/email', async (req, res) => {
  // const { email, subject, text } = req.body
  // cron.schedule('35 * * * *', function () {
  //   mailService(req.body)
  // })
  await mailService(req.body)
  return res.status(200).send('Email sent')
})
export default router
