require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
 const connectDB = require('./config/db');

 app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
 ));
// connect to database
connectDB();
// middleware to parse json requests
app.use(express.json());
// routes

// statis foler for uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// server start point
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});



module.exports = app;

