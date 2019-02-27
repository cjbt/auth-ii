const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./authorization/authRoute');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

server.use('/api', authRoute);

server.get('/', (req, res) => {
  res.send('<h1>Its working!</h1>');
});

module.exports = server;
