const Review = require('../models/review');
const Campground = require('../models/campgroud')

module.exports.createReview = async (req, res) => {
    const campgroud = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campgroud.reviews.push(review);
    await review.save();
    await campgroud.save();
    req.flash('success', 'Created a new review!');
    res.redirect(`/campgrounds/${campgroud._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // take this ID and pull anything with that ID out of reviews
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}