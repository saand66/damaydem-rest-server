    // Imports
var express = require('express');
var bodyParser = require('body-parser');
var ApiRouter = require('./apiRouter').router;
//instaciation serveur

var server = express();


// Configuration  Body-parser

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());


server.get('/', function (req , res){
res.setHeader('Content-Type','text/html');
res.status(200).send('<h1> Bonjour Bienvenue sur mon super serveur</h1>');
});

server.use('/api/', ApiRouter);

server.listen(2121, function(){
    console.log('serveur en ecoute')
});
