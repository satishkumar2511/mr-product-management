import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'

const router = express.Router()
const storage = multer.memoryStorage() // Use memory storage to get the file buffer

mongoose.connect(`${process.env.MONGODB_URI}test_db`)

const FileSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  size: Number,
  data: Buffer,
})

const File = mongoose.model('File', FileSchema)

// const upload = multer({
//   dest: './uploads',
// })
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
    })

    await file.save() // Save the file with the correct data

    res.json({
      id: file._id,
      name: file.name,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.get('/download/:id', async (req, res) => {
  try {
    const fileId = req.params.id

    // Find the file by ID in the database
    const file = await File.findById(fileId)

    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Set the response headers based on the file's metadata
    res.setHeader('Content-Type', file.contentType)
    res.setHeader('Content-Length', file.size)

    // Send the file data as the response
    res.end(file.data)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
