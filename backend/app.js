const express = require('express');
const app = express();
const mongoose = require('mongoose');

const productRoutes = require('./routes/product')
// same as bodyparser
app.use(express.json());

dbURL = 'mongodb+srv://yams:0000@atlascluster.r1j7bvi.mongodb.net/'

mongoose.connect(dbURL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
   })
  .then(() => {
    console.log('Connexion à MongoDB réussi !');
  })
  .catch((error) => {
    console.error('Connexion à MongoDB échouée !', error);
  });

  // USE
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('api/product', productRoutes)


module.exports = app;