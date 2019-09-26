const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('../database/controllers.js')
const port = 8000;

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())


app.post('/test', function (req, res) {
  console.log(req.body)
  api.insertFixtures(req.body, function (err, result) {
    if (err) {
      res.status(500).send('Error with database insertion');
    } else {
      res.status(200).send(result);
    }
  })
})

app.listen(port, () => {
  console.log('App now listening on http://localhost:' + port);
});