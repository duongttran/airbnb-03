var express = require('express');
var router = express.Router();
const { getReviewList, createReview, updateReview, deleteReview } = require('./../controllers/reviewController')

const {loginRequired} = require('./../services/authenticationService')


router.route("/reviews")
    .get(getReviewList)
    .post(loginRequired, createReview)
    

router.route("/reviews/:r_id")
.put(loginRequired, updateReview)
.delete(loginRequired, deleteReview)




module.exports = router;
