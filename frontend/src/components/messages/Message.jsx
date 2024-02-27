import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { user } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? user.profilePicture
    : selectedConversation?.profilePicture;
  const chatBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${chatBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs text-gray-100 flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};
export default Message;
