require('dotenv').config();
const http=require('http');

const port=process.env.PORT || 8000;

const app=require('./app');

const server=http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

// Username: manas
// Password: LE2O3PErXs5SpECG