const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoDB } = require('./config');

mongoose.connect(MongoDB)
.then(()=> 
console.log("success")
)
.catch(()=>console.log("error"));


app.get('/about',(req,res) => { 
res.send();
});

app.listen(3000);
