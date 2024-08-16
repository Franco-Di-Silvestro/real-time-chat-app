import User from "../models/userModel";

export const getUsersForSidebar = async (req: any, res: any) => {
  try {
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
}



export const getUserById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Busca el usuario por ID
    const userById = await User.findOne({ _id: id }).select("-password");

    if (!userById) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userById);
  } catch (error) {
    console.error(error); // Registrar el error en el servidor
    res.status(500).json({ error: 'Internal server error' });
  }
};

