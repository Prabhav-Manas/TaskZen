require('dotenv').config();

const app=require('./app');
const connectDB=require('./src/config/db');

const PORT=process.env.PORT || 8000;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


// controller  → handles request/response
// service     → business logic
// repository  → database operations
// model       → schema
// validation  → request validation
// routes      → endpoints


// Implement the below later:=>
// --> device session tracking
// --> CSRF refresh protection