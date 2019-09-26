const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());


app.post('/test', function (req, res) {

})

app.listen(port, () => {
  console.log('App now listening on http://localhost:' + port);
});