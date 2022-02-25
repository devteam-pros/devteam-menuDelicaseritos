const app = require('./config/server.js');

require('./app/routes/index.js')(app);

app.listen(app.get('port'), () => {
  console.log("Running in port: ", app.get('port'));
})
