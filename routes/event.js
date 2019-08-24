/**
 * Network info route
 */
const express = require('express');
const router = express.Router();
const { eventCtrl } = require('../controller');
const JWT = require('./jwt');

/**
 * URL: (POST) http://localhost:3001/rest/event/add
 * Request Obj:
 * {
 *	"title" : "Math's",
 *  "description" : "something write...",
 * }
 */
router.post('/add',JWT.authToken, async (req, res) => {
    let result = await eventCtrl.add(req);
    res.status(result.code).send(result);
})
router.post('/update',JWT.authToken, async (req, res) => {
    let result = await eventCtrl.editEvent(req);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/event/getAll
 */
router.get('/getAll',JWT.authToken, async (req, res) => {
    let result = await eventCtrl.getAllEvent(req);
    res.status(result.code).send(result);
})

router.get('/getById/:eventId',JWT.authToken, async (req, res) => {
    let result = await eventCtrl.getEventById(req);
    res.status(result.code).send(result);
})

router.get('/delete/:eventId',JWT.authToken, async (req, res) => {
    let result = await eventCtrl.deleteEvent(req);
    res.status(result.code).send(result);
})

module.exports = router;