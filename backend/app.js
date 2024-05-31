const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/Thing');

// same as bodyparser
app.use(express.json());

dbURL = 'mongodb+srv://root:root@atlascluster.smmgkro.mongodb.net/'

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
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

// POST
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        // title: req.body.title // ... spread operator -> copy all elements on req.body
        ...req.body
    })
    thing.save()
    .then(() => res.status(201).json({ message: 'Object created'}))
    .catch(error => res.status(400).json({ error }));
});

// GET
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });
  
  app.get('/api/stuff/:id', (req, res, next) => {
      Thing.findOne({ _id: req.params.id})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
    });



    app.put('/api/stuff/:id', (req, res, next) => {
        Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });

  app.delete('/api/stuff/:id', (req, res, next) => {
      Thing.deleteOne({ _id: req.params.id})
        .then(things => res.status(200).message("message bien supprimé"))
        .catch(error => res.status(400).json({ error }));
    });

  

module.exports = app;