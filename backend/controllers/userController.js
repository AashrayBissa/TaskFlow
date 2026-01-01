const User = require('../models/userSchema');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
}

module.exports.signupInfo = async(req,res)=>{
    let {username,email,password} = req.body;
    let user = await User.findOne({email});
    if(user){
       return res.status(400).json({message:"User already exists!"});
    }
    const hashPass = await bcrypt.hash(password, 10);
    let newUser =  new User({username, email, password: hashPass});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id,email: newUser.email}, "secret", {expiresIn: "4h"});
    res.cookie("myToken",token, {
        httpOnly: true,
        sameSite: "lax",      
        secure: false
    });
   
     return res.status(201).json({message:"User registered successfully!", token, user: {_id: newUser._id, username: newUser.username, email: newUser.email },});
};

module.exports.loginInfo = async(req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return  res.status(400).json({message: "User does not exists. Please Signup"});
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
       return res.status(400).json({message: "Please enter correct password"});
    }
    const token = jwt.sign({  _id: user._id, email: user.email}, "secret", {expiresIn: "4h"});
    res.cookie("myToken",token, {
        httpOnly: true,
        sameSite: "lax",      
        secure: false
    });
    
    return res.status(200).json({message: "Logged in successfully", token, user: { _id: user._id, username: user.username, email: user.email } });
};

module.exports.logout = (req, res) => {
  res.clearCookie('myToken', {
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logged out successfully!' });
}

