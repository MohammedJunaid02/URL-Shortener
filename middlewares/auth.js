const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly (req,res,next){
    const userUid = await req.cookies.uid;
    if(!userUid) return res.redirect("/logIn");

    const user = getUser(userUid);
    if(!user) return res.redirect("/logIn");

    req.user = user;
    next();
}

async function checkAuthentication(req,res,next){
    const userUid = await req.cookies.uid;
    
    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuthentication,
};