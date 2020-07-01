var express = require('express');
var router = express.Router()

const { loginWithEmail } = require("../controllers/authController")
const { loginRequired } = require("../services/authenticationService")

router.route("/login").post(loginWithEmail)

async function logout(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer", "")
        req.user.tokens.filter(el => el !== token)
        await req.user.save()
        res.status(204).end()
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: "fail", message: "unauthorised" })
    }
}

router.route("/logout").get(loginRequired, logout)
router.route("/facebook/login").get(loginFacebook)
router.route("/facebook/authorized").get(facebookAuthHandler)

module.exports = router;

