require('dotenv').config();

const app=require('./app');
const connectDB=require('./src/config/db');

app.set('trust proxy', 1);

const PORT=process.env.PORT || 8000;

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);

    console.log("TaskZen Backend CD check...");
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
// --> Logout from All devices