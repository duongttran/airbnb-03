var express = require('express');
var router = express.Router();
const { getTagList, createTag } = require('../controllers/tagController')
const {loginRequired, hostRequired} = require('./../services/authenticationService')

router.route("/tags")
    .get(getTagList)
    .post(loginRequired, hostRequired, createTag)



module.exports = router;