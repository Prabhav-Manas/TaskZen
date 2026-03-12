require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
    origin: [process.env.FRONTEND_URL || 'http://localhost:4200'],
    methods:"GET, POST, PUT, PATCH, HEAD, DELETE, OPTIONS",
    allowedHeaders:[
        "Content-Type", 
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Allow-Origin"
    ],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log('Error connecting to DB:', err);
});

app.get('/', (req, res)=>{
    res.send('Welcome to TaskZen backend application!');
});

module.exports = app;