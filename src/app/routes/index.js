const express = require('express');
const session = require('express-session');
const app = require('../../config/server.js');
const router = require('../routes/admin');
const exceptions = require('../exceptions');
const axios = require('axios');
const ORDERS_API_HOST = process.env.ORDERS_API_HOST;

function group_orders_by_category(orders) {
  if (orders == undefined)
    return {}

  return orders.reduce((order, prev) => {
    if (!prev.hasOwnProperty(order.category)) {
      prev[order.category] = []
    }
    prev[order.category].push(order)
  }, {})
}

function get_orders() {
  axios.get({
    url: ORDERS_API_HOST+'/products/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data
  }).catch(error => {
    console.log(error)
    context = {
      message: JSON.stringify(error)
    }
    res.render('client/home', context)
  })
}

function authorization_is_valid(headers) {
  if (headers.hasOwnProperty("authorization")) {
    // TODO: Validate token
    return true
  } else {
    return false
  }
}

module.exports = app => {
  app.get('/', (req, res) => {
    const headers = req.headers
    if (authorization_is_valid(headers)) {
      res.render('../views/admin/admin.ejs')
    } else {
      res.redirect('/home')
    }
  });

  app.get('/home', (req, res) => {
    const context = {
      'orders_by_category': group_orders_by_category(get_orders())
    }
    res.render('client/home', context)
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
  
  // API
  app.post('/api/login', (req, res) => {
    const user = {
      id: Date.now(),
      email: req.email,
      password: req.password
    }

    jwt.sign({user}, 'secretKey', (error, token) => {
      res.json({
        token: token
      })
    })
  })

  app.get("/api/orders", (req, res) => {
    res.json({
      data: get_orders()
    })
  })
}
