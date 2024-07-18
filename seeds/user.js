const { User } = require('../models');

const userData =
[
  {
    "username": "saladtini",
    "email": "lernantino@hotmail.com",
    "password": "password12345"
  },
  {
    "username": "zaconium",
    "email": "zli0@gmail.com",
    "password": "zacPW1234"
  },
  {
    "username": "amiChopsticks",
    "email": "amiko@yahoo.com",
    "password": "password12345"
  },
  {
    "username": "DallioHax",
    "email": "dalliohax0@gmail.com",
    "password": "dHaxer9519"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;