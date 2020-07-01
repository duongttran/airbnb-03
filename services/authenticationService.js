const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

exports.loginWithEmail = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error(`Cannot find user with email ${email}`)
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error(`Unable to login`)
    }
    console.log(`loginWithEmail ${user}`)
    return user;
}

exports.generateToken = async (user) => {
    const token = jwt.sign({ _id: user._id }, "gfkgfg", { expiresIn: '7d' })
    user.tokens.push(token)
    await user.save();
    return token;
}

exports.loginRequired = async (req, res, next) => {

    const { token } = req.body;
    if (!token)
        return res.status(401).json({
            status: "fail",
            error: "require token"
        })

    try {
        const decode = jwt.verify(token, "gfkgfg")
        const user = await User.findOne({ _id: decode._id, tokens: token })
        if (!user) throw new Error("Unauthorized")
        req.user = user
        req.token = token
        next()
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: error.message
        })
    }

}

exports.hostRequired = async (req, res, next) => {
    const user = req.user //lay user o phia tren roi kiem tra tiep
    if (user.role !== 'host') {
        res.status(401).json({
            status: "fail",
            error: "require host login"
        })
    }
    next()
}