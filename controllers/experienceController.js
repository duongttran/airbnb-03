const Experience = require('./../models/experience')

const Tag = require('./../models/tag')

const { catchAsync } = require('./errorController')

exports.getExperienceList = catchAsync(async (request, response) => {

    const experienceList = await Experience.find({})
    response.status(200).json({
        experienceList
    })

})

exports.createExperience = catchAsync(async (req, res, next) => {

    const { title, description } = req.body;
    // const user = req.user;
    if (!title || !description)
        return res.status(400).json({
            status: "fail",
            error: "require title, description"
        })

    // const tagObj = await Tag.generateTags(tags)
    const experience = await Experience.create({
        title,
        description,
        // tags: tagObj,
        host: req.user._id //tai vi minh da xai middleware loginRequired
    })
    res.status(201).json({ status: "ok", data: experience })
})



exports.updateExperience = async (req, res) => {

    const { title, description } = req.body;

    if (!title && !description) {
        res.status(400).json({
            message: "are you sure you don't want to update anything?"
        })
    }

    //trong database co experience ko
    //co phai host nay tao experience ko

    const experienceId = req.params.eid // xem lai routes
    let experience = await Experience.findOne({ _id: experienceId, host: req.user._id }) //tim trong database experience co id nay ko


    if (!experience) {
        return res.status(400).json({
            status: 'fail',
            message: "undefined experience"
        })
    }

    // const user = req.user

    // if (user._id.toString() !== experience.host.toString()) {
    //     console.log( user._id,  experience.host)
    //     return res.status(400).json({
    //         status: 'fail',
    //         message: "Only creator can edit"
    //     })
    // }

    await Experience.findByIdAndUpdate(experienceId, {
        title, description
    })
    res.status(201).json({
        status: "success",
        message: "successfully updated the review"
    })

}
