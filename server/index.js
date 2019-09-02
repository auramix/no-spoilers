const express = require('express');
const app = express();
const port = 5021;

app.use(express.static('public'));
app.use(express.static('dist'));

app.listen(port, () => {
  console.log('App now listening on http://localhost:' + port);
});