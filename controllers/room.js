const roomModel = require('../models/room.model');

module.exports.roomList = async (req, res) => {
    let roomList = await roomModel.findAll({
        raw: true
    })

    res.render('room/roomList', { roomList: roomList })
}


module.exports.newRoom = async (req, res) => {
    if (req.body.newRoom.trim()) {
        try {
            const newRoom = await roomModel.findOrCreate({
                where: {
                    roomname: req.body.newRoom.trim()
                }
            })
                .spread((room, created) => {
                    console.log(room.get({
                        plain: true
                    }))
                    if (created) {
                        console.log(created);
                    }
                })
            res.redirect('/');
            // send to all connected clients when new room was created
            req.io.sockets.emit('newRoomCreated', req.body.newRoom.trim()); //sockets not socket
        } catch (err) {
            console.log(err);
        }


    } else {
        res.redirect('/');
    }
}


module.exports.newRoomConnect = async (req, res) => {
    try {
        let room = await roomModel.findAll({
            plain: true,
            where: {
                roomname: req.params.newRoom
            }
        })
        res.render('room/room', { roomName: room.roomname, newUserName: req.body.newUserName });

        if (!room) {
            res.send('Room not found!')
        }
    } catch (err) {
        console.log(err);
    }




}


