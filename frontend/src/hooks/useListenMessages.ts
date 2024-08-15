import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const {selectedConversation, messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(notificationSound)
            sound.volume = 0.3
            sound.play()

            if (newMessage.senderId === selectedConversation?._id) {
                setMessages([...messages, newMessage])
            }
        })

        return () => {
                socket?.off("newMessages");
        };
    }, [socket, setMessages, messages])


}

export default useListenMessages