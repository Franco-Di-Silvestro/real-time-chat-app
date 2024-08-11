
import { User } from "../../classes/User";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

interface IConversation {
  user: User
  lastIndex: boolean
}

const Conversation = ({ user, lastIndex }: IConversation) => {

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === user._id

  const { onlineUsers } = useSocketContext();
  
  const isOnline = onlineUsers.includes(user._id)
  console.log(onlineUsers);
  

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-violet-800 hover:bg-opacity-60 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-violet-800 bg-opacity-60' : ''}`}
        onClick={() => setSelectedConversation(!isSelected ? user : null)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={user.profilePic}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{user.fullName}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation;
