const client = require('./client');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  client.getAll(null, (err, data) => {
    if(!err) {
      res.render('clients', {
        results: data.clients
      });
    }
  });
});

app.post('/save', (req, res) => {
  let newClient = {
    name,
    age,
    address
  } = req.body;

  client.create(newClient, (err, data) => {
    if(err) throw err;

    console.log("Client created!", data);
    res.redirect('/');
  });
});

app.post("/update", (req, res) => {
  const UpdateClient = {
    id,
    name,
    age,
    address
  } = req.body;

  client.put(UpdateClient, (err, data) => {
    if(err) throw err;

    console.log("Client updated!", data);
    res.redirect("/");
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
