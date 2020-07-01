const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: [true, "Role is required"]
    }, 
    introduction: {
        type: String
    },
    tokens: [{//this is an array because we allow the same users to log in with several devices
        type: String
    }]

})

userSchema.statics.findOneOrCreate = async function({email, name}) {
    const user = await this.findOneOrCreate({email: email});
    if(!user) {
        user = await this.create({
            email: email,
            name: name,
            
        })
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User;