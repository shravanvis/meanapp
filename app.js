const express = require('express');
const app = express();

const port = 3000;
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.send('hi this is root route');
})

// database connection

const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost/practisedb'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const con = mongoose.connection
con.once('open', ()=>console.log('connected'))
con.on('error', ()=>console.log('error found while connecting db'));

app.use('/users', userRouter);
app.listen(port, ()=>console.log('server is up and running'));