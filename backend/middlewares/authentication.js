const jwt = require("jsonwebtoken");

const authentication = async(req,res,next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.myToken;
        if(!token){
            return res.status(401).json({status:false, message:"Authentication failed!"})
        }
        const payload =  jwt.verify(token, "secret");
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = authentication;