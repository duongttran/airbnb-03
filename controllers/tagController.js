const Tag = require('./../models/tag')

exports.getTagList = async (request, response) => {
    try {
        const tagList = await Tag.find({})
        response.status(200).json({
            tagList
        })
    } catch (error) {
        response.status(400).json({
            message: "Error!!"
        })
    }
}

exports.createTag = async (request, response, next) => {
    
    try {
        const {title} = request.body
        
        if (!title) {
            response.status(400).json({
                message: "title is required"
            })
        }

        const tag = await Tag.create({
            title: title
        })
        response.status(201).json({ status: "ok", data: tag })
        
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}





