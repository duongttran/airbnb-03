const mongoose = require('mongoose')


const experienceSchema = mongoose.Schema({
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Experience must have a host"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    }, 
    duration: {
        type: Number,
       
    }, 
    groupSize: {
        type: Number,
        
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: [true, "description is required"]
    },
    items: [{
        type: String,
     
    }], 
    price: {
        type: Number,
    
    },
    country: {
        city: {
            type: String
            },
        country: {
            type: String
            },
    }, 
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
  
    }]
 
}, 
    {
        timestamps: true,
        toJSON: { virtual: true },
        toObject: { virtual: true}
    }
)


const Experience = mongoose.model("Experience", experienceSchema)
module.exports = Experience;