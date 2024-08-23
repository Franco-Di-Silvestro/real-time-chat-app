import mongoose from "mongoose";
import Conversation from "../models/conversationModel";
import Message from "../models/messageModel";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: any, res: any) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    // Convert senderId and receiverId to ObjectId
    const senderObjectId = new mongoose.Types.ObjectId(senderId)

    // Create a new message
    const newMessage = new Message({
      senderId: senderObjectId,
      receiverId,
      message,
    })

    await newMessage.save()

    // Ensure the conversation exists and update it
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderObjectId, receiverId],
      },
    })

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderObjectId, receiverId],
      })
    }
    conversation.messages.push(newMessage._id)

    await conversation.save()


    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getMessages = async (req: any, res: any) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages")

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);

  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
}