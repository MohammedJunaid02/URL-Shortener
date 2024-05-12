const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies.token;
    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    next();

    //if we use the below one, then we will get the token - Header Bearer Authentication
    //this is more like a advanced version and improved code used in the feature/headerBearerAuthentication branch
    // const authorizationHeaderValue = req.headers["authorization"];
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startswith("Bearer"))
    //     return next();

    // const token = authorizationHeaderValue.split("Bearer ")[1];
    // const user = getUser(token);

    // req.user = user;
    // next();

}

function restrictTo(roles= []) {
    return function(req, res, next) {
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("You are unauthorized to access this");

        next(); 
    } 
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};