import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { Message as IMessage } from "../../classes/Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {

  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages, loading]);


  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>

      )}
      {!loading ? (
        messages.map((message: IMessage) => {
          return <div key={message._id} ref={lastMessageRef}><Message message={message} /></div>
        })
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default Messages;
