const passport = require('passport')
const facebookStrat = require('./facebook')


passport.use(facebookStrat)

module.exports = passport