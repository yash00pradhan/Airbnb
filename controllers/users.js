const User = require('../models/user.js');


module.exports.renderSignUpForm = (req, res)=>{
    res.render("users/signup.ejs");
}


module.exports.signUp = async(req,res)=>{
    try{
    let {username, password, email}  = req.body;
    const newUser = User({username, email});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash('success', 'Welcome to Wanderlust!');
        res.redirect("/listings");
    })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect("/signup");
    }
}

// render login form
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

// login form
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!..")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
//logout
module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out now");
        res.redirect("/listings");
    })
}

