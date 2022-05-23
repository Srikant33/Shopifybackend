const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoDB } = require('./config');
const ItemModel = require('./src/obj')

mongoose.connect(MongoDB)
.then(()=> 
app.listen(3000)
)
.catch(()=>console.log("error"));


app.get('/add-item',(req,res) => { 
    const item = new ItemModel({
        title:'strawberry',
        description:'a juicy fruit',
        quantity:5,
        warehouse_location:'New York - 1'
    });
    item.save()
    .then((result) => res.send(result))
    .catch((err) => {console.log(err)});
});

app.listen(3000);
