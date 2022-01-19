const express = require('express');
const app =  express();

const connectDB = require('./db/connect')
const router = require('./routes/routes');
require('express-async-errors')
require('dotenv').config();
const cors = require('cors');

app.use(cors({
    origin: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000

app.get('/test', (req, res) => {
    res.json({
        massage: 'API running succesfully'
    })
})
app.get('/', (req, res)=>{
    res.send('<h1>Home Page</h1>Navigate to /api/<> for other routes')
})
app.use('/api', router);

const start = async (req, res)=>{
    await connectDB(process.env.MONGO_URI);
    try {
        app.listen(PORT);
        console.log(`Listening on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
}

start();