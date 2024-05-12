// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "MJunaid$@8954";
function setUser(user){
    //stateless authentication
    // const payload = {
    //     _id: user._id,
    //     email: user.email,
    // };

    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        }, 
        secretKey
    );

    // stateful authentication
    // sessionIdToUserMap.set(id,user);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);

    if (!token) return null;
    try{
        return jwt.verify(token, secretKey);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};