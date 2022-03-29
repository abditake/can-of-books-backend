'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Books = require('./model/books');
mongoose.connect(process.env.DB_URL);



async function seed(){

  await Books.create({
    title: 'Hunger Games',
    description:'Katniss and her journey to the top',
    status:true,
    email:'abdinasir.yussuf@outlook.com'
  });

  await Books.create({
    title: 'the Giver',
    description:'dystopian future about old man and kid',
    status:true,
    email:'abdinasir.yussuf@outlook.com'
  });

  await Books.create({
    title: 'Fahrenheit 451',
    description:'books are banded and have been outlawed.',
    status:true,
    email:'abdinasir.yussuf@outlook.com'
  });

  mongoose.disconnect;
}

seed();
