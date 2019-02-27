require('dotenv').config();
const express = require('express');
const authenticate = require('./authenticate');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const route = express.Router();

route.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: 'Missing needed fields' });
  } else {
    db('users')
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 60
          });
          res.json({ message: `Welcome ${username}`, token });
        } else {
          res.status(401).json({ messag: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ err, message: 'sucks bro' });
      });
  }
});

route.post('/register', (req, res) => {
  const { username, password, department } = req.body;
  const body = req.body;
  if (!username || !password || !department) {
    res.status(422).json({ message: 'Missing needed fields' });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db('users')
      .insert({ username, password: hash, department })
      .then(user => {
        res.json({ message: `You have registered, ${username}!` });
      })
      .catch(err => res.status(500).json(err));
  }
});

route.get('/users', authenticate, (req, res) => {
  db('users')
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

module.exports = route;
