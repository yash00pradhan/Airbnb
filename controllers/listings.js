const Listing = require("../models/listing");


// index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

// new route

module.exports.newRoute = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/new.ejs", {listing});
}


// create Route
module.exports.createRoute = async(req,res,next)=>{

    let url = req.file.path;
    let filename = req.file.filename

    let listing = req.body.listing;
    const newListing = Listing(listing);
    newListing.image = {url, filename};
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!..")
    res.redirect("/listings");
}

// Edit Route
module.exports.editRoute = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    //console.log(listing);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}

// Update Route
module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    const { ...Uplisting } = req.body.listing;
    // Check if price is negative
    if (Uplisting.price < 0) {
        throw new Error("Price cannot be negative");
    }
    // Update listing
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename}
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully!..")
    res.redirect(`/listings/${id}`);
}

//delete Route
module.exports.deleteRoute = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!..");
    res.redirect("/listings");
}
// Show Route
module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({path : "review", populate: {path: "author"} })  // Populating reviews
        .populate("owner"); // Populating owner (only fetching name)

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}