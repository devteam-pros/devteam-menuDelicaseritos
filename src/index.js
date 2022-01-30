const app = require('./config/server.js');

require('./app/routes/index-routes.js')(app);

app.listen(app.get('port'),() =>{
  console.log("Servidor en el puerto: ", app.get('port'));
})