const sequelize = require('sequelize');
const db = require('../data/database');

const users = db.define('userlist', /*Schema*/{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: sequelize.TEXT,
    socketid: sequelize.STRING,
    roomname: sequelize.TEXT
});

db.sync();

// users.destroy({
//     where: {},
//     truncate: true,
//     cascade: false,
//     restartIdentity: true
// })


module.exports = users;