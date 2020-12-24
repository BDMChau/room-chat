const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/room');


router.get('/', roomController.roomList);

router.post('/newRoom', roomController.newRoom);

router.get('/:newRoom', roomController.newRoomConnect);

router.post('/:newRoom', roomController.newRoomConnect);


module.exports = router;