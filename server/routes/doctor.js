import express from 'express'
import db from '../db.js'
import mongo from 'mongodb'
import { VerifyToken } from '../helper/verifyToken.js'

const router = express.Router()
// const objectId = new ObjectId();
// Get a list of users
router.get('/getDoctorList', async (req, res) => {
  const {
    searchText,
    sortBy,
    sortType,
    favourite,
    page = 0,
    pageLimit = 1,
  } = req.query
  let collection = db.collection('doctor_master')
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
    // results = results.map(item => 
    //   {
    //  return item["id"] = item._id});
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
router.post('/addDoctor', async (req, res) => {
  let collection = db.collection('doctor_master')
  let newDocument = {
    doctor_name : req.body.doctor_name,
    pts_ptr : req.body.pts_ptr,
    pre_post : req.body.pre_post,
    doctor_dec : req.body.doctor_dec,
    mr_id : new mongo.ObjectId(req.body.loggedInUserId),
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
router.patch('/updateDoctor', async (req, res) => {
  try{
    console.log("doctorDetails req")
    console.log(req.body)
    const query = { _id: new mongo.ObjectId(req.body._id) }
    let collection = db.collection('doctor_master')
    
    let doctorDetails = {
      doctor_name : req.body.doctor_name,
      pts_ptr : req.body.pts_ptr,
      pre_post : req.body.pre_post,
      doctor_dec : req.body.doctor_dec,
      modified_date : new Date(),
      modifided_by : new mongo.ObjectId(req.body.loggedInUserId),
    }
    
    let result = await collection.updateOne(query, {$set: doctorDetails}, { upsert: true })
  
    res.send(result).status(200)
  } catch (err) {
    console.log("update Doctor error")
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
