const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bp = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cakes', {useNewUrlParser: true});
fs.readdirSync(path.join(__dirname, './../models')).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        require(path.join(__dirname, './../models') + '/' + file);
    }
});
app.use(express.urlencoded({extended: true}));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(express.static( path.join(__dirname, './../../public/dist/public')));
app.use(session({
    secret: 'thisisakey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
module.exports = app;
