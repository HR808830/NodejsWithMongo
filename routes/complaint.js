/**
 * Network info route
 */
const express = require('express');
const router = express.Router();
const { complaintCtrl } = require('../controller');
const JWT = require('./jwt');

/**
 * URL: (POST) http://localhost:3001/rest/complaint/add
 * Request Obj:
 * {
 *	"title" : "Math's",
 *  "description" : "something write...",
 * }
 */
router.post('/add',JWT.authToken, async (req, res) => {
    let result = await complaintCtrl.add(req);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/complaint/getAll
 */
router.get('/getAll',JWT.authToken, async (req, res) => {
    let result = await complaintCtrl.getAllComplaint(req);
    res.status(result.code).send(result);
})

router.get('/delete/:complaintId',JWT.authToken, async (req, res) => {
    let result = await complaintCtrl.deleteComplaint(req);
    res.status(result.code).send(result);
})

module.exports = router;