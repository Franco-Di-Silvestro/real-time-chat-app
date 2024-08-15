import User from "../models/userModel";

export const getUsersForSidebar = async(req: any, res: any )=> { 
  try {
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })    
  }
}