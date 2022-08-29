const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(user,process.env.SECRET);
}

const verifyToken = (req,res,next) => {
    let token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decodedToken) =>{
            if(err) {
                res.send("invalid token. Add redirect functionality...");
            }
            else{
                next();
            }

        });

    }
    else{
        res.send('no cookies');
    };
    
}

module.exports = {generateToken,verifyToken};