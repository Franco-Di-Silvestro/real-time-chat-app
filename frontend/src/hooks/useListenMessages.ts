import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound)
            sound.volume = 0.3
            sound.play()
            setMessages([...messages, newMessage])
        })

        return () => {
            if (socket) {
                socket.off("newMessages");
            }
        };
    }, [socket, setMessages, messages])


}

export default useListenMessages