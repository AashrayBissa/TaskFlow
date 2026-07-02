const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const authentication = async(req,res,next) => {
    try {
        const token = req.cookies.myToken;
        if(!token){
            return res.status(401).json({status:false, message:"Authentication failed!"})
        }
        const payload =  jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({status:false, message:"Session expired. Please log in again."});
    }
};

module.exports = authentication;
