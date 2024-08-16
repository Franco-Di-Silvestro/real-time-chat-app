import React, { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from "../assets/sounds/notification.mp3";
import toast from 'react-hot-toast';
import Notification from '../components/notification/Notification';
import { Message } from '../classes/Message';
import { User } from '../classes/User';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, messages, setMessages } = useConversation();
    const [userById, setUserById] = useState<User | undefined>(undefined);

    const handleMessage = async (newMessage: Message) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.volume = 0.3;
        sound.play();

        if (newMessage.senderId === selectedConversation?._id) {
            setMessages([...messages, newMessage]);
        } else {
            const user = await getUserByID(newMessage.senderId);
            if (user) {
                toast.custom(() => <Notification message={newMessage} user={user} />, { duration: 1500 });
            }
        }
    };

    const getUserByID = async (id: String): Promise<User | undefined> => {
        try {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setUserById(data);
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
            return undefined;
        }
    };

    useEffect(() => {
        socket?.on("newMessage", handleMessage);

        return () => {
            socket?.off("newMessage", handleMessage);
        };
    }, [socket, selectedConversation, setMessages, messages]);

    

    return;
};

export default useListenMessages;
