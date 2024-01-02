import express from 'express'
import db from '../db.js'
import mongo from 'mongodb'
import { VerifyToken } from '../helper/verifyToken.js'
import { GetUserModel, GetMRModel } from '../models/models.js'

const router = express.Router()
// const objectId = new ObjectId();
// Get a list of users
router.get('/getMRList', async (req, res) => {
  const {
    searchText,
    sortBy,
    sortType,
    favourite,
    page = 0,
    pageLimit = 1,
  } = req.query
  let collection = db.collection('mr_master')
  const limit = Number(pageLimit)

  try {
    // let query = {
    //   $or: [
    //     { username: { $regex: searchText, $options: 'i' } },
    //     { firstName: { $regex: searchText, $options: 'i' } },
    //     { lastName: { $regex: searchText, $options: 'i' } },
    //   ],
    //   $and: [favourite ? { isFavourite: favourite == 1 ? true : false } : {}],
    // }
    const skip = (page - 1) * limit

    const total_results = await collection.countDocuments()//(query)
    console.log("total_results")
    console.log(total_results)
    const total_pages = Math.ceil(total_results / limit)

    let o_id = new mongo.Int32(1)
    let query = { user_id: o_id }

    let results = await collection.find().toArray()
    console.log("results")
    console.log(results)
      //.find(query)
      // .sort({ [sortBy]: sortType })
      // .skip(skip)
      // .limit(limit)
      // .toArray()
    res.send({ results, total_pages }).status(200)
  } catch (err) {
    console.log("error occured when fetching users")
    console.log(err)
  }
})

// Get user by id
router.get('/getMRDetails/:id', async (req, res) => {
  let collection = db.collection('mr_master')
  try {
    let o_id = new mongo.ObjectId(req.params.id)
    let query = { _id: o_id }
    let result = await collection.findOne(query)
    if (!result) {
      res.sendStatus(404)
    } else res.send(result)
  } catch (err) {
    res.sendStatus(404)
  }
})

// Add a new document to the collection
router.post('/addMRAndCreateUser', async (req, res) => {
  let user_collection = db.collection('user_master')
  let user_Document = GetUserModel('6579ee489285026e3374cc17')
  user_Document.user_first_name = req.body.mr_first_name
  user_Document.user_last_name = req.body.mr_last_name
  user_Document.email = req.body.email
  user_Document.password = req.body.password

  let user_result = await user_collection.insertOne(user_Document)

  let collection = db.collection('mr_master')
  let mRDocument = GetMRModel('6579ee489285026e3374cc17')
  mRDocument.user_id = user_result._id
  mRDocument.mr_first_name = req.body.mr_first_name
  mRDocument.mr_last_name = req.body.mr_last_name
  mRDocument.email = req.body.email
  mRDocument.password = req.body.password

  newDocument.createdAt = new Date()
  let result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})

// Update the user
router.patch('/updateMRDetails/:id', async (req, res) => {
  const query = { _id: new mongo.ObjectId(req.params.id) }
  const updates = {
    $set: { ...req.body, updatedAt: new Date() },
  }

  let collection = db.collection('mr_master')
  let result = await collection.updateOne(query, updates)

  res.send(result).status(200)
})

// Delete an entry
router.delete('/deleteMR/:id', async (req, res) => {
  const query = { _id: new mongo.ObjectId(req.params.id) }

  const collection = db.collection('mr_master')
  let result = await collection.deleteOne(query)

  res.send(result).status(200)
})
export default router
