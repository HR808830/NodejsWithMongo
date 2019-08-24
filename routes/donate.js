/**
 * Network info route
 */
const express = require('express');
const router = express.Router();
const { donateCtrl } = require('../controller');
const JWT = require('./jwt');

/**
 * URL: (POST) http://localhost:3001/rest/donate/add
 * Request Obj:
 * {
 *	"title" : "Math's",
 *  "description" : "something write...",
 * }
 */
router.post('/add',JWT.authToken, async (req, res) => {
    let result = await donateCtrl.add(req);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/donate/getAll
 */
router.get('/getAll',JWT.authToken, async (req, res) => {
    let result = await donateCtrl.getAll(req);
    res.status(result.code).send(result);
})


router.get('/delete/:donateId',JWT.authToken, async (req, res) => {
    let result = await donateCtrl.deletes(req);
    res.status(result.code).send(result);
})

module.exports = router;