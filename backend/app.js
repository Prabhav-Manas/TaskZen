const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const cookieParser = require('cookie-parser');

const authRoutes=require('./src/modules/auth/auth.routes');
const projectRoutes=require('./src/modules/project/project.routes');
const {errorHandler}=require('./src/middleware/error.middleware');

const app=express();

const corsOptions={
    origin:[process.env.FRONTEND_URL || 'http://localhost:4200'],
    methods:"GET, POST, PUT, PATCH, HEAD, DELETE,OPTIONS",
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Allow-Origin"
    ],
    credentials:true
}

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use(errorHandler);

module.exports=app;