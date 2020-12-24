const userModel = require("../models/user.model");
const roomModel = require("../models/room.model");
const messageModel = require("../models/message.model");
const moment = require("moment");

module.exports.newUser = (socket_io) => {
  socket_io.on("newUser", async (roomName, name) => {
    const room = await roomModel.findAll({
      raw: true,
      plain: true,
    });
    room.roomname = roomName;

    try {
      const userName = await userModel
        .findOrCreate({
          where: {
            username: name,
            socketid: socket_io.id,
            roomname: roomName,
          },
        })
        .spread((user, created) => {
          console.log(
            user.get({
              plain: true,
            })
          );
          socket_io.join(roomName);
          socket_io.emit("serverMessage", `Message from server: Welcome <b>${name}</b> to room chat!`
          );

          socket_io.to(roomName).broadcast.emit("newUserName", name);
        });
    } catch (err) {
      console.log(err);
    }


  });
};


module.exports.newMessage = (socket_io) => {
  socket_io.on("userMessage", async (roomName, message, name) => {
    const curTimeSecond = moment().format("h:mm:ss a"); //current time receive userMessage

    try {
      const newMess = await messageModel.create({
        socketid: socket_io.id,
        roomname: roomName,
        username: name,
        message: message,
        time: curTimeSecond
      });
    } catch (err) {
      console.log(err);
    }
  });
};


module.exports.roomMessage = (socket_io) => {
  socket_io.on("userMessage", async (roomName, message, name) => {
    const curTime = moment().format("h:mm a"); //current time receive userMessage
    const curTimeSecond = moment().format("h:mm:ss a");

    try {
      const getUser = await userModel.findAll({
        plain: true,
        where: {
          socketid: socket_io.id
        },
      });

      const getMess = await messageModel.findAll({
        plain: true,
        where: {
          socketid: socket_io.id,
          roomname: roomName,
          username: getUser.username,
          message: message,
          time: curTimeSecond
        },
      });

      var dbName = getMess.username;
      var dbMessage = getMess.message;

      socket_io.to(roomName).broadcast.emit("userServerMessage", {
        name: dbName,
        message: dbMessage,
        time: curTime,
      });
    } catch (err) {
      console.log(err);
    }


  });
};


module.exports.disconnectUser = (socket_io) => {
  socket_io.on("disconnect", async () => {
    const getUser = await userModel.findAll({
      raw: true,
      plain: true,
      where: {
        socketid: socket_io.id,
      },
    });

    const name = getUser.username;
    socket_io.to(getUser.roomname).broadcast.emit("userDisconnect", name);
  });
};
