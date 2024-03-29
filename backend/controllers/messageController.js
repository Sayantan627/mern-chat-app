import { StatusCodes } from "http-status-codes";
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import { NotFoundError } from "../errors/customError.js";
import { getReceiverId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  conversation.messages.push(newMessage._id);

  //   await newMessage.save();
  //   await conversation.save();
  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReceiverId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(StatusCodes.OK).json(newMessage);
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");
  if (!conversation) res.status(StatusCodes.OK).json([]);
  const messages = conversation.messages;
  res.status(StatusCodes.OK).json(messages);
};
