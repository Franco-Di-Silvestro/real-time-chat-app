import { create} from "zustand"; 
import { Message } from "../classes/Message";
import { User } from "../classes/User";

interface IUseConversation {
  selectedConversation: User | null
  setSelectedConversation: (selectedConversation: User | null) =>void 
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const useConversation = create<IUseConversation>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: User | null) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
}))

export default useConversation;