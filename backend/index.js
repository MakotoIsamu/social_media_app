require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require('./routes/PostRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error connecting database: ' + err));

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
