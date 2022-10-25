const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./db/config');
var path = require('path');


const app = express();

dbConnection();


app.use(express.static('public'));
app.use(express.static(__dirname + 'public'));
app.set('view engine', 'jsx');





app.use( express.json() );


app.use('/api/auth', require('./routes/auth'));
app.use('/api/info', require('./routes/info'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })



app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});