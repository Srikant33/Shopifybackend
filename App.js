const express = require('express');
const app = express();
const deletedItemModel = require('./models/inactive')
const mongoose = require('mongoose');
const { MongoDB } = require('./config');
const ItemModel = require('./src/obj')

const cors = require("cors");

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.set ('view engine','ejs');

mongoose.connect(MongoDB)
.then(()=> 
app.listen(3000)
)
.catch(()=>console.log("error"));


app.get('/',(req,res) => { 
    res.redirect('/all-items');
});

app.post('/add-item',(req,res) => { 

    const item = new ItemModel(req.body);
    item.save()
    then((result) => res.redirect('/all-items'))    .catch((err) => {console.log(err)});
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findById(id)
      .then(result => {
        console.log(result);
        res.render('edit', { item: result, page: 'Edit an Item' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/edit-item/:id', (req, res) => {
    const id = req.params.id;
    console.log("req")
    console.log(req);
    ItemModel.findByIdAndUpdate(id,req.body)
      .then(result => {
        res.redirect('/all-items');
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/all-items',(req,res) => {
    ItemModel.find().sort({createdAt: -1})
    .then((result) =>  res.render('index', {items:result ,page:'Shopify Inventory'} ))
    .catch((err) => {console.log(err)});
 });

 app.get('/inactive-items',(req,res) => {
    deletedItemModel.find().sort({createdAt: -1})
    .then((result) =>  res.render('inactive', {items:result ,page:'Shopify Inventory'} ))
    .catch((err) => {console.log(err)});
  });

 app.get('/add', (req, res) => {
    res.render('add', { page: 'Add a new item' });
  });

// delete the inventory item 
app.delete('/delete/:id/:comments', (req, res) => {
    const id = req.params.id;


    ItemModel.findByIdAndDelete(id)
      .then(result => {
        console.log(result);
        req.method = 'GET';
        console.log(req.method);
        const deletedItem = new deletedItemModel({_id:result._id,title:result.title,description:result.title,quantity:result.quantity,warehouse_location:result.warehouse_location,deletion_comments:req.params.comments});
        deletedItem.save()
        .then((result) => 

        res.redirect('/all-items')

        )
        .catch((err) => {console.log(err)});
      })
      .catch(err => {
        console.log(err);
      });


});
// recover the inventory item - delete document in deleted items collection and add to items 
app.delete('/recover/:id', (req, res) => {
const id = req.params.id;

console.log(req.body);

deletedItemModel.findByIdAndDelete(id)
  .then(result => {
    console.log(result);
    //res.json({ redirect: '/' });
    req.method = 'GET';
    const item = new ItemModel({_id:result._id,title:result.title,description:result.title,quantity:result.quantity,warehouse_location:result.warehouse_location});
  item.save()
  .then((result) =>res.redirect('/all-items'))
  .then((result) =>console.log("reload"))
  .catch((err) => {console.log(err)});
    })
    .catch(err => {
    console.log(err);
    });
});
