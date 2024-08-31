import express from 'express'
import 'dotenv/config'
import connectDB from './db/connect.js'
import userRouter from './routes/user.js'
import resumeRouter from './routes/resume.js'

const app = express()

// Middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/user', userRouter)
app.use('/resume', resumeRouter)

// Default error-handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ msg: 'Something broke' })
})

// Undefined routes
app.use((req, res) => {
    res.status(404).send('Route does not exist')
})

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MongoDB_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()