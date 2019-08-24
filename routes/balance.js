/**
 * Network info route
 */
const express = require('express');
const router = express.Router();
const { balanceCtrl } = require('../controller');
const JWT = require('./jwt');

/**
 * URL: (POST) http://localhost:3001/rest/balance/add
 * Request Obj:
 * {
 *	"title" : "Math's",
 *  "description" : "something write...",
 * }
 */
router.post('/add', async (req, res) => {
    let result = await balanceCtrl.add(req);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/balance/getAll
 */
router.get('/getAll', async (req, res) => {
    let result = await balanceCtrl.getAllBalance(req);
    res.status(result.code).send(result);
})
router.get('/balanceUser/:userId', async (req, res) => {
    let result = await balanceCtrl.getBalanceUser(req);
    res.status(result.code).send(result);
})

router.get('/getById/:eventId', async (req, res) => {
    let result = await balanceCtrl.getByIdBalance(req);
    res.status(result.code).send(result);
})

router.get('/delete/:balanceId', async (req, res) => {
    let result = await balanceCtrl.deleteBalance(req);
    res.status(result.code).send(result);
})

module.exports = router;