import { StatusCodes } from "http-status-codes";
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import { NotFoundError } from "../errors/customError.js";

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

  res.status(StatusCodes.OK).json(newMessage);
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");
  if (!conversation) throw NotFoundError("no conversation found");
  const messages = conversation.messages;
  res.status(StatusCodes.OK).json(messages);
};
