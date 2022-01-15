const express = require('express');
const app =  express();

const connectDB = require('./db/connect')
const router = require('./routes/routes');
require('express-async-errors')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('<h1>Home Page</h1>Navigate to /api/<> for other routes')
})
app.use('/api', router);

const start = async (req, res)=>{
    await connectDB(process.env.MONGO_URI);
    try {
        app.listen(PORT);
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        res.json(error);
    }
}

start();