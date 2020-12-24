const sequelize = require('sequelize');
const db = require('../data/database');

const roomList = db.define('roomlist', /*Schema*/{
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: sequelize.TEXT
});


db.sync();


// roomList.destroy({
//   where: {},
//   truncate: true,
//   cascade: false,
//   restartIdentity: true
// })

module.exports = roomList;