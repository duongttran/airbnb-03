const express = require('express')
var router = express.Router();


const { createExperience, getExperienceList, updateExperience } = require('../controllers/experienceController')

const { loginRequired, hostRequired } = require('../services/authenticationService')


router.route("/experiences")
    .post(loginRequired, hostRequired, createExperience)
    .get(getExperienceList)


router.route("/experiences/:eid")
    .put(loginRequired, hostRequired, updateExperience)
    .delete()




module.exports = router;