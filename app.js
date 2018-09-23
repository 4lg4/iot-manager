const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services');
const {version} = require('./package.json');
const port = process.env.NODE_PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/version', (req, res) => res.send(version));
services.forEach((service)=> app[service.method](`/api${service.route}`, service.service));

// log uncaught Exception
process.on('uncaughtException', (err)=>
  console.error('uncaughtException ', err)
);

// log unhandled promise rejection
process.on('unhandledRejection', (reason)=>
  console.error('unhandledRejection ', reason)
);

app.listen(port, () => console.log(`app listening on port ${port}!`));
