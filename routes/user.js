/**
 * Network info route
 */

const express = require('express');
const router = express.Router();
const { userCtrl } = require('../controller');

const JWT = require('./jwt');
const { fileUpload }= require('../service');
/**
 * URL: (POST) http://localhost:3001/rest/account/register
 * Request Obj:
 * {
 *	"name" : "HR",
 *  "email" : "patelhr808830@gmail.com",
 *	"password":"12345"	
 * }
 */
router.post('/register', async (req, res) => {
    let result = await userCtrl.createUser(req.body);
    res.status(result.code).send(result);
})


/**
 * URL: (POST) http://localhost:3001/rest/account/login
 * Request Obj:
 * {
 *	"email":"patelhr808830@gmail.com",
 *	"password":"12345"
 * }
 */
router.post('/login', async (req, res) => {
    let result = await userCtrl.loginUser(req.body);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/account/getprofile
 * Request Obj:
 * {
 *	"email":"hr123@gmail.com",
 * }
 */
router.get('/getProfile', JWT.authToken, async (req, res) => {
    let result = await userCtrl.getUserProfile(req);
    res.status(result.code).send(result);
})

router.get('/getAll',JWT.authToken, async (req, res) => {
    let result = await userCtrl.getAllUser(req);
    res.status(result.code).send(result);
})


router.get('/getUser/:userId',JWT.authToken, async (req, res) => {
    let result = await userCtrl.getUserById(req);
    res.status(result.code).send(result);
})


/**
 * URL: (POST) http://localhost:3001/rest/account/updateProfile
 * Request Obj:
 * {
 *	"email":"hr123@gmail.com",
 *	"name":"Hemant"
 * }
 */
router.post('/updateProfile', JWT.authToken, async (req, res) => {
    let result = await userCtrl.updateUserProfile(req);
    res.status(result.code).send(result);
})

router.post('/changePassword',JWT.authToken, async (req, res) => {
    let result = await userCtrl.changePassword(req);
    res.status(result.code).send(result);
})
/**
 * URL: (POST) http://localhost:3001/rest/account/forgotPassword
 * Request Obj:
 * {
 *	"email":"hr123@gmail.com",
 * }
 */
router.post('/forgotPassword', async (req, res) => {
    let result = await userCtrl.forgotPassword(req);
    res.status(result.code).send(result);
})

router.post('/newPassword', async (req, res) => {
    let result = await userCtrl.newPassword(req);
    res.status(result.code).send(result);
})


router.get('/dashboard',JWT.authToken, async (req, res) => {
    let result = await userCtrl.userDashboard(req);
    res.status(result.code).send(result);
})
router.get('/delete/:userId',JWT.authToken, async (req, res) => {
    let result = await userCtrl.deleteUser(req);
    res.status(result.code).send(result);
})
router.post('/updateUserStatus',JWT.authToken, async (req, res) => {
    let result = await userCtrl.userActive(req);
    res.status(result.code).send(result);
})
router.post('/uploadImage',fileUpload.base64fileUpload, async (req, res) => {
    res.status(200).send({code:200,url:req.body.image});
})
module.exports = router;