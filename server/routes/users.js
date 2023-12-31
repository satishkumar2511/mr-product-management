import express from 'express'
import db from '../db.js'
import mongo from 'mongodb'
import { VerifyToken } from '../helper/verifyToken.js'

const router = express.Router()
// const objectId = new ObjectId();
// Get a list of users
router.get('/', async (req, res) => {
  const {
    searchText,
    sortBy,
    sortType,
    favourite,
    page = 0,
    pageLimit = 1,
  } = req.query
  let collection = db.collection('user_master')
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

    let results = await collection.findOne(query)
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

// router.get('/login', async (req, res) => {
//   const {
//     email,
//     password
//   } = req.body
//   let collection = db.collection('user_master')
//   const limit = Number(pageLimit)

//   try {
//     let o_id = new mongo.Int32(1)
//     let query = { user_id: o_id }

//     let results = await collection.findOne(query)
//     console.log("results")
//     console.log(results)
//       //.find(query)
//       // .sort({ [sortBy]: sortType })
//       // .skip(skip)
//       // .limit(limit)
//       // .toArray()
//     res.send({ results, total_pages }).status(200)
//   } catch (err) {
//     console.log("error occured when fetching users")
//     console.log(err)
//   }
// })

// with query
// router.get('/', async (req, res) => {
//   const {
//     searchText,
//     sortBy,
//     sortType,
//     favourite,
//     page,
//     pageLimit = 1,
//   } = req.query
//   let collection = db.collection('users_master')
//   const limit = Number(pageLimit)

//   try {
//     let query = {
//       $or: [
//         { username: { $regex: searchText, $options: 'i' } },
//         { firstName: { $regex: searchText, $options: 'i' } },
//         { lastName: { $regex: searchText, $options: 'i' } },
//       ],
//       $and: [favourite ? { isFavourite: favourite == 1 ? true : false } : {}],
//     }
//     const skip = (page - 1) * limit

//     const total_results = await collection.countDocuments(query)
//     const total_pages = Math.ceil(total_results / limit)
//     let results = await collection
//       .find(query)
//       .sort({ [sortBy]: sortType })
//       .skip(skip)
//       .limit(limit)
//       .toArray()
//     res.send({ results, total_pages }).status(200)
//   } catch (err) {
//     console.log("error occured when fetching users")
//     console.log(err)
//   }
// })

// Get user by id
router.get('/:id', async (req, res) => {
  let collection = db.collection('users')
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
router.post('/', async (req, res) => {
  let collection = db.collection('users')
  let newDocument = req.body

  newDocument.createdAt = new Date()
  let result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})

// Update the user
router.patch('/:id', async (req, res) => {
  const query = { _id: new mongo.ObjectId(req.params.id) }
  const updates = {
    $set: { ...req.body, updatedAt: new Date() },
  }

  let collection = db.collection('users')
  let result = await collection.updateOne(query, updates)

  res.send(result).status(200)
})

// Delete an entry
router.delete('/:id', async (req, res) => {
  const query = { _id: new mongo.ObjectId(req.params.id) }

  const collection = db.collection('users')
  let result = await collection.deleteOne(query)

  res.send(result).status(200)
})
export default router
