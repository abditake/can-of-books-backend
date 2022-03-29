'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

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

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// routes 
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})



app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
