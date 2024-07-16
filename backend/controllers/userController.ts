import User from "../models/userModel";

export const getUsersForSidebar = async(req: any, res: any )=> { 
  try {
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.log('Error in getUsersForSidebar: ', error.message)
    res.status(500).json({ error: 'Internal server error' })    
  }
}