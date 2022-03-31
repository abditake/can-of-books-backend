'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./model/books');


// require mongoose 
const mongoose = require('mongoose');


// connect mongoose to mongodb
mongoose.connect(`${process.env.DB_URL}`);

// validiation to wire up mongodb
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// implement express
const app = express();

// middleware
app.use(cors());

// must have this to recieve json from a request 
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;


app.get('/test',(req,res) =>{
  response.send('test request received')
})

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
async function getBooks(req, res, next) {
  // REST VERB: GET / MONGOOSE MODEL.find
  try {
    const filterQuery={};
    if(req.query.title){
      filterQuery.title = req.query.title;
    }
    let bookResults = await Books.find();
    res.status(200).send(bookResults);
  } catch (error) {
    next(error);
  }

}

async function postBooks(req,res,next){
  // REST VERB: POST // MONGOOSE model.create()
  console.log(req.body);

  try{
    let createdBook = await Books.create(req.body);
  res.status(200).send(createdBook);  

  }catch(error){
    next(error)
  }
}

async function deleteBooks( req, res, next){
  // REST VERB delete / MONGOOSE model.findbyidandDElete()
  let id = req.params.id;
  try{
    console.log(id);
  await Books.findByIdAndDelete(id);
    res.send('book deleted');
  }catch(error){
    next(error)
  }
}

async function putBook(req,res,next){
  try{
    let id = req.params.id;
    // data about updated book is in req.body
    let updatedBooks = await axios.findByIdAndUpdate(id,req.body,{new: true, overwrite:true});
    res.status(200).send(updatedBooks);
  }catch(error){
    next(error);
  }
}

// routes 
app.get('/', (request, response) => {
  response.send('Welcome!');
})





// app.get('/test', (request, response) => {

//   response.send('test request received')

// })

app.listen(PORT, () => console.log(`listening on ${PORT}`));
