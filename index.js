let users = require('./users.json');
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');

const findUserById = (id) => {
  return users.find(u => u.id === id)
};

app.use(express.json());

app.get('/users', (req, res, next) => {
  res.send(users);
});

app.get('/users/:id', (req, res, next) => {
  user = findUserById(req.params['id']);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send('User not found.');
  }
});

app.delete('/users/:id', (req, res, next) => {
  user = findUserById(req.params['id']);
  if (user) {
    users.splice(users.indexOf(user), 1)
    res.status(204).send()
  } else {
    res.status(404).send('User not found.');
  }
})

app.put('/users', (req, res, next) => {
  if (!req.body['name'] || !String(req.body['name']).length) {
    res.status(400).send('Name is required.');
  } else {
    const user = {
      id: uuid(),
      name: String(req.body['name'])
    };
    users.push(user);
    res.status(201).send(user);
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});