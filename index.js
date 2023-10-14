const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const authRouter = require('./authRouter')
const cors = require('cors');
const PORT = process.env.PORT || 5000
const fileUpload = require('express-fileupload')


const app = express()
app.use(
    cors({
      origin: 'http://localhost:5173', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    })
  );

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/auth', authRouter)
const start = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (error){
        console.log(error);
    }
}

start()

//49C3pwdKTq3qeUGH