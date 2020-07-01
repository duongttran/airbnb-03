const Review = require('./../models/review')
const Experience = require('./../models/experience')
const AppError = require('./../utils/appError')

exports.getReviewList = async (request, response) => {
    
    try {
        const reviewList = await Review.find({})
        response.status(200).json({
            reviewList
        })
    } catch (error) {
        response.status(400).json({
            message: "Error!!"
        })
    }
}

/* exports.getReviewList = catchAsync(async (req,res,next)=> {
    const reviewList = await Review.find({})
    res.json({status: "ok", data: reviews})
}) */

exports.createReview = async (request, response) => {
    try {
        const { rating, experienceId, content } = request.body
        if (!rating || !experienceId) {
            return response.status(400).json({
                message: "rating, experience is required"
            })
        }

        let experience = await Experience.findOne({ _id: experienceId });

        if (!experience) {
            return response.status(401).json({
                message: error.message
            })
        }

       
        const reviewInDb = await Review.findOne({user: request.user._id, experience: experienceId})
        if (reviewInDb) {
            return response.status(400).json({
                status: "fail",
                message: "already created review"
            })
        }

        const review = await Review.create(
            {
                user: request.user._id,
                content: content,
                rating: rating,
                experience: experienceId
            }
        )

        await review.populate({path: "user", select: '_id name'}).populate({path: "experience", select: "title"}).execPopulate()

        response.status(201).json({
            status: 'success',
            data: review
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}

exports.updateReview = async (request, response) => {
    try {
        //console.log(request.user);
        const reviewId = request.params.r_id;// muon biet review nay la review nao - lay id cua tra o trogn database cua minh
        let review = await Review.findOne({ _id: reviewId });//
        if (JSON.stringify(request.user._id) != JSON.stringify(review.user)) //
        
        {
            response.status(400).json({
                status: 'fail',
                message: "Only creator can edit"
            })
            return;
        }
        const { content, rating, experience } = request.body
        await Review.findByIdAndUpdate(reviewId, {
            content, rating, experience
        })
        response.status(201).json({
            status: "success",
            message: "successfully updated the review"
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}



exports.deleteReview = async (request, response) => {
    try {
        const reviewId = request.params.r_id;
        await Review.findByIdAndDelete(reviewId);
        response.status(201).json({
            status: "success",
            message: "successfully delete the review"
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}





