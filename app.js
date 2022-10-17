const express = require('express') 
const route   = require('./routes')
const user    = require('./routes/user')
const http    = require ('http')
const path    = require('path');
const port    = 3000; 

const session = require('express-session');
const app     = express();
const mysql   = require('mysql');

let bodyParser = require("body-parser");

let connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'park_smart'
            });


connection.connect(function(err) {
    if(err){
        console.error("error connecting " + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.use(session({
    secret: 'Trying',
    resave: false,
    saveUninitialized: true
}));

global.db = connection;
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', route.index);

app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', route.index);
app.post('/login', user.login);

app.get('/logout', user.logout);
app.get('/dashboard', user.dashboard);
app.get('/map', user.map);
app.get('/ListerMap', user.ListerMap);


app.listen(3000);