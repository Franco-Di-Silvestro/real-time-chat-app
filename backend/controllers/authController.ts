import User from "../models/userModel"
import bcrypt from "bcryptjs"

export const login = (_req: any, res: any) => {
  res.send("LOGIN USER")
}

export const logOut = (_req: any, res: any) => {
  res.send('LOG OUT USER')
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

    await newUser.save()

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    })
  } catch (error: any) {
    console.error("Error signup controller", error.message)
    res.status(500).json({error: "internal Server Error"});
  }
}