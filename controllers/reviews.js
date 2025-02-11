const Listing = require('../models/listing.js');
const Review = require('../models/review.js');


module.exports.postRoute = async(req, res) => {
    console.log("Hello")
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Submited!..")
    res.redirect(`/listings/${listing._id}`);
}


module.exports.deleteRoute = async(req, res)=>{
    let {id, reviewId} = req.params;
    console.log(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully!..")
    res.redirect(`/listings/${id}`);
}

