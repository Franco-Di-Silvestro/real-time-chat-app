
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { User } from "../../classes/User";

const Conversations = () => {

  const {loading, conversations} = useGetConversations()

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {!loading ? (
        conversations.map((user: User, index: number) => {
          return <Conversation key={index} user={user} lastIndex={index === conversations.length - 1} />
        })
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
};

export default Conversations;
