const express = require('express');
const routes = express.Router()

const client = require('./client');

routes.get('/', (req, res) => {
  client.getAll(null, (err, data) => {
    if(!err) {
      res.render('clients', {
        results: data.clients
      });
    }
  });
});

routes.post('/save', (req, res) => {
  let newClient = {
    name,
    age,
    phone
  } = req.body;

  client.create(newClient, (err, data) => {
    if(err) throw err;

    console.log("Client created!", data);
    res.redirect('/');
  });
});

routes.post("/update", (req, res) => {
  const UpdateClient = {
    id,
    name,
    age,
    phone
  } = req.body;

  client.put(UpdateClient, (err, data) => {
    if(err) throw err;

    console.log("Client updated!", data);
    res.redirect("/");
  });
});

module.exports = routes;