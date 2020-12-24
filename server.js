const express = require('express');
const port = 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const roomRoute = require("./routes/room/room.route");
const socketController = require('./controllers/mySocket');

///////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public')); // js client 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/', roomRoute);

///////////////
io.on('connection', socketController.newUser);
io.on('connection', socketController.newMessage);
io.on('connection', socketController.roomMessage);
io.on('connection', socketController.disconnectUser);



// const rooms = {};

// app.get('/', (req, res) => {
//     res.render('room/roomList', { roomList: rooms })
// })

// app.post('/newRoom', (req, res) => {
//     if (rooms[req.body.newRoom]) {
//         return res.redirect('/');
//     }
//     rooms[req.body.newRoom] = { users: {} };
//     res.redirect('/');

//     // send to all connected clients when new room was created
//     io.emit('newRoomCreated', req.body.newRoom);
// })


// app.get('/:newRoom', (req, res) => {
//     if (!rooms[req.params.newRoom]) {
//         return res.redirect('/');
//     }

//     res.render('room/room', { roomName: req.params.newRoom })

// })



// io.on('connection', (socket) => {

//     socket.on('newUser', (roomName, name) => {
//         // data = require('./data/data.json');
//         // let newUserData = {
//         //     name: name,
//         //     ID: socket.id
//         // }
//         // data.userList.push(JSON.stringify(newUserData));
//         // fs.writeFileSync('./data/data.json', JSON.stringify(data), (err) => {
//         //     if (err) {
//         //         console.log('can not save');
//         //     }
//         //     console.log('ok');
//         // })
//         // delete data;
//         //////////////////
//         socket.join(roomName)
//         socket.emit('serverMessage', 'Message from server: Welcome ' + '<b>' + name + '</b>' + ' to room chat!');
//         rooms[roomName].users[socket.id] = name;
//         socket.to(roomName).broadcast.emit('newUserName', name);
//     })

//     socket.on('userMessage', (roomName, message) => {
//         socket.to(roomName).broadcast.emit('serverMessageUser', {
//             message: message,
//             name: rooms[roomName].users[socket.id]
//         });
//     })

//     socket.on('disconnect', () => {
//         userInRoom(socket).forEach(roomName => {
//             let name = rooms[roomName].users[socket.id];
//             socket.to(roomName).broadcast.emit('userDisconnectName', name);
//             delete name;
//         });

//     })
// })

// userInRoom = (socket) => {
//     return Object.entries(rooms).reduce((users, [user, room]) => {
//         if (room.users[socket.id]) {
//             users.push(user);
//         }
//         return users;
//     }, [])
// }


server.listen(port, () => {
    console.log('server listening at port ' + port);
});



