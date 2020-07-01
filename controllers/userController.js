const User = require('./../models/user')
const bcrypt = require('bcrypt')
const { generateToken, loginWithEmail } = require('./../services/authenticationService')


exports.getUserList = async (request, response) => {
    try {
        const userList = await User.find({})
        response.status(200).json({
            userList
        })
    } catch (error) {
        response.stats(400).json({
            message: "Can't display userList"
           
        })
    }
}

exports.updateUser = async (request, response) => {
    const { email, name, password, introduction, token } = request.body
    //neu user de tat ca cac field empty thi bao loi
    if (!name && !email && !password && !introduction ) {
        response.status(400).json({
            message: "are you sure you don't want to update anything?"
        })
    }
    //kiem tra xem co' token ko
    if(!token) {
        return response.status(400).json({
            status: 'fail',
            message: "there is no token"
        })
    }

    const user = await User.findOne({tokens:token})
    const eid = await Experience.findOne({_id: eid})
    
    if (email) {
        user.email = email
    }
    if (name) {
        user.name = name
    }
    if (password) {
        user.password = password
    }
    if (introduction) {
        user.introduction = introduction
    }

    await user.save()

    response.status(200).json({
        status: 'success',
        data: user 
    })
}

exports.createUser = async (request, response) => {
    try {
        console.log("request body 213", request.body.name)
        const { email, name, password, role, introduction } = request.body
        // neu user de 1 trong cac field trong thi ko tao duoc user moi
        if (!name || !email || !password || !role) {
            response.status(400).json({
                message: "Name, email, password, role are required"
            })
        }

        if (role == 'host') {
            if (!introduction) {
                return response.status(400).json({
                    status: 'fail',
                    message: "if a user is a host, one must write introduction"
                })
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email,
            name: name,
            password: hashedPassword, 
            role: role,
            introduction: introduction
        })

        const token = await generateToken(user);

        response.status(201).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}

exports.login = async (request, response) => {
    try {
        //1. check the validity of data
        console.log("login is here 1")
        const { email, password } = request.body
        if (!email || !password) throw new Error("Email and password are required")
        console.log("login is here 2")
        //2. check email & password correct
        const user = await loginWithEmail(email, password);
        console.log("login is here 3")
        const token = await generateToken(user);
        console.log("login is here 4")
        //3. response to the user
        response.status(200).json({
            status: 'success',
            data: { user, token }
        })
    } catch (error) {

        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.logout = async (request, response) => {
    try {
        //1. take and check the validity of the info that client has sent
        const token = request.body.token
        
        if (!token) {
            response.status(400).json({
                status: 'fail',
                message: 'token is required'
            })
        }
        //2. find user that has token that is like the token that has been sent
        const user = await User.findOne({tokens:token})

        user.tokens = user.tokens.filter(item => item !== token)
        await user.save()

        return response.status(200).json({
            status: 'log out successfully',
            data: null
        })
    } catch (error) {
        return response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

