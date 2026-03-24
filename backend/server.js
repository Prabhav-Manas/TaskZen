require('dotenv').config();

const app = require('./app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 8000;

// Start server ONLY after DB connects
connectDB()
  .then(() => {
    console.log('Connected to Database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed ❌', err);
    process.exit(1); // stop app (important for Render)
  });


// controller  → handles request/response
// service     → business logic
// repository  → database operations
// model       → schema
// validation  → request validation
// routes      → endpoints


// Implement the below later:=>
// --> device session tracking
// --> CSRF refresh protection
// --> Logout from All devices