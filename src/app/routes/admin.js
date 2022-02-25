const express = require('express');
const session = require('express-session');
const app = express.Router();

app.get('/', (req,res) => {
  res.render('../views/admin/login.ejs');
});
app.get('/homepage', (req,res) => {
  res.render('../views/admin/index-admin.ejs');
});

module.exports = app;