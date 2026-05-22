import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, User, ArrowLeft, Send, Loader2 } from "lucide-react";
import {
  getChatHistoryAPI,
  sendMessageAPI,
  getChatByAdminAPI,
  getImgURL,
} from "../services/authService";
import { toast } from "react-toastify";

const ChatPopup = ({ show, onClose, listing, isOwner, currentId }) => {
  const chatEndRef = useRef(null);
  const [viewMode, setViewMode] = useState("list");
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchChatData = useCallback(async () => {
    if (!show || !listing) return;
    try {
      if (isOwner) {
        if (viewMode === "list") {
          const res = await getChatByAdminAPI(currentId);
          if (res.success) {
            const map = new Map();
            const unique = [];

            res.data.forEach((m) => {
              // Extract the 'other' person from the populated senderId/receiverId
              const sender = m.senderId;
              const receiver = m.receiverId;

              let other = null;
              // If I am NOT the sender, the sender is the customer
              if (
                sender &&
                typeof sender === "object" &&
                sender._id !== currentId
              ) {
                other = sender;
              }
              // If I am NOT the receiver, the receiver is the customer
              else if (
                receiver &&
                typeof receiver === "object" &&
                receiver._id !== currentId
              ) {
                other = receiver;
              }

              if (other && other._id && !map.has(other._id)) {
                map.set(other._id, true);
                unique.push(other);
              }
            });
            setChatUsers(unique);
          }
        } else if (selectedUser) {
          const res = await getChatHistoryAPI(currentId, selectedUser._id);
          if (res.success) setChatMessages(res.data);
        }
      } else {
        // For User: Get history with the Owner
        const res = await getChatHistoryAPI(currentId, listing.ownerId._id);
        if (res.success) setChatMessages(res.data);
      }
    } catch (err) {
      console.error("Chat fetch error:", err);
    }
  }, [show, listing, isOwner, viewMode, selectedUser, currentId]);

  useEffect(() => {
    let interval;
    if (show) {
      fetchChatData();
      interval = setInterval(fetchChatData, 4000);
    }
    return () => clearInterval(interval);
  }, [show, fetchChatData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, viewMode]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const payload = {
        senderId: currentId,
        receiverId: isOwner ? selectedUser._id : listing.ownerId._id,
        message: newMessage,
      };
      const res = await sendMessageAPI(payload);
      if (res.success) {
        setNewMessage("");
        fetchChatData();
      }
    } catch (err) {
      toast.error("Failed to send");
    } finally {
      setIsSending(false);
    }
  };

  if (!show) return null;

  // Logic to determine the header title
  const getHeaderName = () => {
    if (!isOwner) return listing.ownerId?.fullName || "Business Owner";
    if (viewMode === "chat" && selectedUser) return selectedUser.fullName;
    return "Recent Chats";
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3 shadow-lg border-0 rounded-4 overflow-hidden bg-white chat-popup"
      style={{
        width: "380px",
        zIndex: 10000,
        height: "550px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
      }}>
      {/* HEADER */}
      <div
        className="p-3 d-flex justify-content-between align-items-center text-white"
        style={{ backgroundColor: "#001f3f" }}>
        <div className="d-flex align-items-center gap-2">
          {isOwner && viewMode === "chat" && (
            <ArrowLeft
              className="cursor-pointer me-2"
              size={20}
              onClick={() => {
                setViewMode("list");
                setSelectedUser(null);
              }}
            />
          )}
          <div
            className="bg-white rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
            style={{ width: "38px", height: "38px" }}>
            <img
              src={getImgURL(
                !isOwner
                  ? listing.ownerId?.profileImage
                  : selectedUser?.profileImage,
              )}
              className="w-100 h-100 object-fit-cover"
              alt="user"
              onError={(e) =>
                (e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png")
              }
            />
          </div>
          <div className="text-start">
            <p className="m-0 fw-bold small">{getHeaderName()}</p>
            {!isOwner && (
              <small style={{ fontSize: "10px", opacity: 0.8 }}>Owner</small>
            )}
          </div>
        </div>
        <X className="cursor-pointer" size={20} onClick={onClose} />
      </div>

      {/* CHAT AREA */}
      <div
        className="flex-grow-1 overflow-auto p-3"
        style={{
          backgroundColor: "#e5ddd5",
          backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        }}>
        {isOwner && viewMode === "list" ? (
          <div className="d-flex flex-column gap-2">
            {chatUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setSelectedUser(u);
                  setViewMode("chat");
                }}
                className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm cursor-pointer border">
                <div className="bg-light rounded-circle p-2">
                  <User size={20} className="text-navy" />
                </div>
                <div className="text-start overflow-hidden">
                  <div className="fw-bold text-navy text-truncate small">
                    {u.fullName}
                  </div>
                  <div className="text-muted text-truncate small">
                    {u.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {chatMessages.map((msg, i) => {
              // Handle populated vs string ID for senderId
              const msgSenderId =
                typeof msg.senderId === "object"
                  ? msg.senderId?._id
                  : msg.senderId;
              const isMe = msgSenderId === currentId;

              return (
                <div
                  key={i}
                  className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                  <div
                    className="shadow-sm position-relative"
                    style={{
                      maxWidth: "85%",
                      padding: "10px 45px 20px 12px",
                      fontSize: "14px",
                      borderRadius: isMe
                        ? "15px 15px 0 15px"
                        : "15px 15px 15px 0",
                      backgroundColor: isMe ? "#001f3f" : "#fff",
                      color: isMe ? "#fff" : "#333",
                      wordBreak: "break-word",
                    }}>
                    {msg.message}
                    <div
                      className="position-absolute"
                      style={{
                        bottom: "4px",
                        right: "8px",
                        fontSize: "10px",
                        opacity: 0.7,
                      }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      {(viewMode === "chat" || !isOwner) && (
        <form
          onSubmit={handleSend}
          className="p-3 bg-light border-top d-flex gap-2">
          <input
            type="text"
            className="form-control rounded-pill px-4"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary rounded-circle"
            style={{
              width: "45px",
              height: "45px",
              backgroundColor: "#001f3f",
            }}
            disabled={isSending || !newMessage.trim()}>
            {isSending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatPopup;
