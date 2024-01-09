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
  try{
    let user_collection = db.collection('user_master')
    let query = { email : req.body.email};
    let IfExist = await user_collection.find(query).toArray()
    if(IfExist.length > 0)
    {
      res.send({Success : false, message : "User is already exist"}).status(204)
    }
    else{
      console.log("req.body")
      console.log(req.body)
     
      console.log("user_collection")
      console.log(user_collection)
      let user_Document = {
        user_first_name : req.body.mr_first_name,
        user_last_name : req.body.mr_last_name,
        email : req.body.email,
        password : req.body.password,
        created_date : new Date(),
        modified_date : new Date(),
        isdeleted : 0,
        role_id :2,
        created_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
        modifided_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
          }
      //GetUserModel('6579ee489285026e3374cc17')
      console.log("user_Document")
      console.log(user_Document)
      // user_Document.user_first_name = req.body.mr_first_name
      // user_Document.user_last_name = req.body.mr_last_name
      // user_Document.email = req.body.email
      // user_Document.password = req.body.password
      // console.log("user_Document")
      // console.log(user_Document)
      let user_result = await user_collection.insertOne(user_Document)
      console.log("user_result")
      console.log(user_result)
    
      let collection = db.collection('mr_master')
      let mRDocument =  {
        mr_first_name : req.body.mr_first_name,
        mr_last_name :  req.body.mr_last_name,
        email : req.body.email,
        password : req.body.password,
        created_date : new Date(),
        modified_date : new Date(),
        isdeleted : 0,
        created_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
        modifided_by : new mongo.ObjectId('6579ee489285026e3374cc17'),
        user_id : new mongo.ObjectId(user_result.insertedId)
          }
      // GetMRModel('6579ee489285026e3374cc17')
      // mRDocument.user_id = user_result._id
      // mRDocument.mr_first_name = req.body.mr_first_name
      // mRDocument.mr_last_name = req.body.mr_last_name
      // mRDocument.email = req.body.email
      // mRDocument.password = req.body.password
      console.log("mRDocument")
      console.log(mRDocument)
    
      //newDocument.createdAt = new Date()
      let result = await collection.insertOne(mRDocument)
      console.log("user_result")
      console.log(result)
      res.send(result).status(204)
    }
    
  }
  catch(err){
    console.log("Error = "+err)
  }
  
})

// Update the user
router.put('/updateMRDetails', async (req, res) => {
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
