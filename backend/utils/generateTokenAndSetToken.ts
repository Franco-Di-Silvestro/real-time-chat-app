import jwt from "jsonwebtoken"



const generateTokenAndSetCookie = (userId: import("mongoose").Types.ObjectId,res: any) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: "15d"})
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly:true, // prevents XSS attacks
        sameSite: "strict",//  prevents CSRF attacks
        secure: process.env.NODE_ENV === "production"
    })

}

export default generateTokenAndSetCookie;
