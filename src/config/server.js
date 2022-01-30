const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const path = require('path');
/* 
const { dirname } = require('node:path');
const { urlencoded } = require('body-parser'); */

const app = express();

dotenv.config({path: path.join(__dirname, '../env/.env')});

app.set('port', process.env.PORT || 5000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, '../app/views'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/resources', express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports = app;