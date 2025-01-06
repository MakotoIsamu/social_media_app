require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const authRoutes = require('./routes/AuthRoutes')
const postRoutes = require('./routes/PostRoutes')
const MongoStore = require('connect-mongo')
const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 1000 * 60 * 60
    }),
    cookie: {
        httpOnly: false,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Database connected'))
    .catch((err)=>console.log('Error connecting database'+ err));

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.listen(PORT, () => (
    console.log(`Server is listening on PORT: ${PORT}`)
))