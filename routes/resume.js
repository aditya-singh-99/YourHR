import express from 'express'
import multer from "multer";
import { getResume, postResume } from '../controllers/resume.js'

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  }
})

const resumeRouter = express.Router()

resumeRouter.get('/', getResume)
resumeRouter.post('/', upload.single('file'), postResume)

export default resumeRouter