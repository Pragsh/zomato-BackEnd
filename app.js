const express = require('express');
const routes =require('./Routes/index');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 2023;
const host = '0.0.0.0';
const app = express();


app.use(cors());
app.use(express.json());
app.use('/',routes);

mongoose.connect('mongodb+srv://pragya:Pragya@123@cluster0.u8jk0.mongodb.net/Zomato_App?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host,()=>{
        console.log(`Server running at ${host}:${port}`);
    });
})
.catch() 