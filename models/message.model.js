const sequelize = require('sequelize');
const db = require('../data/database');

const historyMessage = db.define('historymessage', /*Schema*/{
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  socketid: sequelize.STRING,
  username: sequelize.TEXT,
  message: sequelize.TEXT,
  roomname: sequelize.STRING,
  time: sequelize.STRING
});

db.sync();


// historyMessage.destroy({
//   where: {},
//   truncate: true,
//   cascade: false,
//   restartIdentity: true
// })

module.exports = historyMessage;