const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly (req,res,next){
    //bearer authentication--header
    const userUid = req.headers["authorization"];
    if(!userUid) return res.redirect("/logIn");

    const token = userUid.split("Bearer ")[1];
    const user = getUser(token);
    if(!user) return res.redirect("/logIn");

    req.user = user;
    next();


    // const userUid = await req.cookies.uid;
    // if(!userUid) return res.redirect("/logIn");

    // const user = getUser(userUid);
    // if(!user) return res.redirect("/logIn");

    // req.user = user;
    // next();
}

async function checkAuthentication(req,res,next){
    const userUid = req.headers["authorization"];

    //bearer authentication--header
    if(userUid)
    {
        const token = userUid.split("Bearer ")[1];
        const user = getUser(token);
        req.user = user;
    }
    next();


    // const userUid = await req.cookies.uid;
    
    // const user = getUser(userUid);

    // req.user = user;
    // next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuthentication,
};