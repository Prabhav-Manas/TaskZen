const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const cookieParser = require('cookie-parser');

const authRoutes=require('./src/modules/auth/auth.routes');
const userRoutes=require('./src/modules/user/user.routes');
const projectRoutes=require('./src/modules/project/project.routes');
const {errorHandler}=require('./src/middleware/error.middleware');

const app=express();

const allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL // e.g., Netlify
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  methods: "GET, POST, PUT, PATCH, HEAD, DELETE, OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

module.exports=app;