/**
 * Network info route
 */
const express = require('express');
const router = express.Router();
const { galleryCtrl } = require('../controller');
const JWT = require('./jwt');
const { fileUpload }= require('../service');

/**
 * URL: (POST) http://localhost:3001/rest/gallery/add
 * Request Obj:
 * {
 *	"title" : "Math's",
 *  "description" : "something write...",
 * }
 */
router.post('/add',JWT.authToken,fileUpload.base64fileUpload, async (req, res) => {
    let result = await galleryCtrl.add(req);
    res.status(result.code).send(result);
})


/**
 * URL: (GET) http://localhost:3001/rest/gallery/getAll
 */
router.get('/getAll',JWT.authToken, async (req, res) => {
    let result = await galleryCtrl.getAllGallery(req);
    res.status(result.code).send(result);
})


router.get('/delete/:galleryId',JWT.authToken, async (req, res) => {
    let result = await galleryCtrl.deleteGallery(req);
    res.status(result.code).send(result);
})

module.exports = router;