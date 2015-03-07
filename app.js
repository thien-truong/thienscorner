var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'mustache');
app.enable('view cache');
app.engine('mustache', require('hogan-express'));

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
