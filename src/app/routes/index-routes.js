const express = require('express');
const session = require('express-session');
const app = require('../../config/server.js');
const router = require('../routes/admin-routes')

module.exports = app => {
  app.get('/', (req,res) => {
    res.render('../views/client/index.ejs');
  });
  app.get('/index', (req,res) => {
    res.render('../views/client/index.ejs');
  });
  app.use('/admin', router, (req,res) => {
    res.render('../views/admin/login.ejs');
  });

  app.get('/menu', (req,res) => {
    res.render('../views/menu.ejs');
  });
  app.get('/galeria', (req,res) => {
    res.render('../views/galeria.ejs');
  });
  app.get('/reserva', (req,res) => {
    res.render('../views/reserva.ejs');
  });
  app.get('/about', (req,res) => {
    res.render('../views/about.ejs');
  });
  
  /* app.get('/error-window', (req,res) => {
    res.render('../views/error-window.ejs');
  }); */
}