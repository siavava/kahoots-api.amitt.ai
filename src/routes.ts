import { Router } from 'express';
import * as Rooms from './controllers/room_controller';

const router = Router();
// here we set up handling of endpoints
// each route will talk to a controller and return a response

// default index route
router.get('/', (req, res) => {
  return res.json({ message: 'Welcome to the kahoot API!' });
});

// create a room - admin
router.post('/rooms', async (req, res) => {
  const roomInitInfo = req.body;

  try {
    const result = await Rooms.createRoom(roomInitInfo);
    return res.json(result);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
});

// get gamestate for room
router.get('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const { player } = req.query;

  // fill in try/catch that handles calling the appropriate Rooms function
  // returns a response, see `create a room` above
  try {
    const result = await Rooms.getState(roomId, player);
    return res.json(result);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
});

// join a room
router.post('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const playerInfo = req.body;

  // fill in try/catch that handles calling the appropriate Rooms function
  // returns a response, see `create a room` above
  try {
    const result = await Rooms.joinRoom(roomId, playerInfo);
    return res.json(result);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
});

// change room status - admin
router.patch('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const { roomKey, status } = req.body;

  // fill in try/catch that handles calling the appropriate Rooms function
  // returns a response, see `create a room` above
  try {
    const result = await Rooms.changeStatus(roomId, roomKey, status);
    return res.json(result);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
});

// submit a response
router.post('/rooms/:id/submissions', async (req, res) => {
  const roomId = req.params.id;
  const { player, response } = req.body;

  // fill in try/catch that handles calling the appropriate Rooms function
  // returns a response, see `create a room` above
  try {
    const result = await Rooms.submitAnswer(roomId, player, response);
    return res.json(result);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
});

export default router;
