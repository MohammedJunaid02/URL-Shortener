const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
async function handleUserSignUp(req,res){
    const body = req.body;
    const user = await User.findOne({email: body.email});
    if(user)
    {
        return res.json({errorMessage:`A user with the email: ${user.email} already exists`});
    }
    const {name,email,password}  = body;
    await User.create({
        name,
        email,
        password,
    });

    return res.status(201).redirect("/");
}   

async function handleUserLogIn(req,res){
    const { email,password }  = req.body;
    const user = await User.findOne({email,password});
    if(!user) 
        return res.render("logIn",{
            error: "Invalid Username or Password",
        });
    //statefull authentication
    // const sessionId = uuidv4();
    // res.cookie("uid", sessionId);

    //stateless authentication - JWT
    // const token = setUser(user); 
    // res.cookie("uid", token);
    // return res.redirect("/");

    //bearer authentication--header
    const token = setUser(user); 
    return res.json({ token });
    
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn,
};