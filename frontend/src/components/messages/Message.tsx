
import { Message as IMessage } from "../../classes/Message";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";


interface IMessageProps {
  message: IMessage,

}

const Message = ({ message }: IMessageProps) => {

  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleColor = fromMe ? "bg-blue-500" : ""
  const formatedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? "shake" : ""



  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
