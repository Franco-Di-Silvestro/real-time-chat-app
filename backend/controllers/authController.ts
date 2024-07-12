import User from "../models/userModel"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken"



export const logOut = async (_req: any, res: any) => {
  try{
    res.cookie("jwt","",{maxAge: 0 });
    res.status(200).json({message: "Logged out successfully"})
  }
  catch (error: any) {
    console.error("Error logout controller", error.message)
    res.status(500).json({error: "internal Server Error"});
  }
}

export const signUp = async (req: any, res: any) => {
  try {
    const {fullName, username, password, confirmPassword, gender} = req.body

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" })
    }
    
    const user = await User.findOne({username})
    
    if (user) {
      return res.status(400).json({error: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })


    if(newUser){

      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save()
      
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    } else{
      res.status(400).json({error:"Invalid user data"})
    }
  } catch (error: any) {
    console.error("Error signup controller", error.message)
    res.status(500).json({error: "internal Server Error"});
  }
}
export const login = async (req: any, res: any) => {
  try {
    const {username,password} = req.body
    const user = await User.findOne({username})
    const isPasswordCorrect= await bcrypt.compare(password, user?.password || "")

    if(!user||!isPasswordCorrect){
      return res.status(400).json({error: "Invalid user or password"})
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    })

    
  } catch (error: any) {
    console.error("Error login controller", error.message)
    res.status(500).json({error: "internal Server Error"});
  }
}