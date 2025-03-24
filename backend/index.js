require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tweetRoutes = require('./routes/TweetRoutes');
const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require('./routes/PostRoutes');
const userRoutes = require('./routes/UserRoutes');
const shortsRoutes = require('./routes/UploadShortsRoute');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:'https://vaartalapkaro.vercel.app',
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error connecting database: ' + err));

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tweet', tweetRoutes);
app.use('/api/shorts', shortsRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
