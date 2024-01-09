import express from 'express'
import db from '../db.js'
import mongo from 'mongodb'
import { VerifyToken } from '../helper/verifyToken.js'

const router = express.Router()
// const objectId = new ObjectId();
// Get a list of users
router.get('/getProductList', async (req, res) => {
  const {
    searchText,
    sortBy,
    sortType,
    favourite,
    page = 0,
    pageLimit = 1,
  } = req.query
  let collection = db.collection('product_master')
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
router.post('/addProduct', async (req, res) => {
  let collection = db.collection('product_master')
  let newDocument = {
    product_name : req.body.product_name,
    product_des : req.body.product_des,
    pts : req.body.pts,
    ptr : req.body.ptr,
    created_date : new Date(),
    modified_date : new Date(),
    isdeleted : 0,
    created_by : new mongo.ObjectId(req.body.loggedInUserId),
    modifided_by : new mongo.ObjectId(req.body.loggedInUserId),
  }

  let result = await collection.insertOne(newDocument)
  res.send(result).status(204)
})

// Update the user
router.post('/updateProduct', async (req, res) => {
  try{
    console.log("partyDetails req")
    console.log(req.body)
    const query = { _id: new mongo.ObjectId(req.body._id) }
    let collection = db.collection('product_master')
    
    let productDetails = {
      product_name : req.body.product_name,
      product_des : req.body.product_des,
      pts : req.body.pts,
      ptr : req.body.ptr,
      modified_date : new Date(),
      modifided_by : new mongo.ObjectId(req.body.loggedInUserId),
    }
    
    let result = await collection.updateOne(query, {$set: productDetails}, { upsert: true })
  
    res.send(result).status(200)
  } catch (err) {
    console.log("update Product error")
    console.log(err)
    res.sendStatus(404)
  }
})

// Delete an entry
router.delete('/deleteMR/:id', async (req, res) => {
  const query = { _id: new mongo.ObjectId(req.params.id) }

  const collection = db.collection('mr_master')
  let result = await collection.deleteOne(query)

  res.send(result).status(200)
})
export default router
