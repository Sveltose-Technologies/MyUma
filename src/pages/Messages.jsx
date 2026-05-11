import React, { useState, useEffect, useRef } from "react";
import { socket } from "../services/socket";
import {
  getAllOwnersAPI,
  getAllUsersAPI,
  getImgURL,
} from "../services/authService";

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // Get current user from localStorage (Login code puts it there)
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.connect();

    if (currentUser?._id) {
      // Register with role for the backend logic
      socket.emit("register", {
        userId: currentUser._id,
        role: currentUser.role,
      });
    }

    // Listen for real-time messages
    socket.on("receiveMessage", (data) => {
      // Add message to screen if it's from the person we are chatting with
      setMessages((prev) => [
        ...prev,
        {
          senderId: data.senderId,
          message: data.message,
          time: new Date(),
        },
      ]);
    });

    // Fetch the list of people to talk to
    fetchContactList();

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  // Always scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchContactList = async () => {
    try {
      let res;
      if (currentUser.role === "owner") {
        // If I am an Owner, show me all Users (Guests)
        res = await getAllUsersAPI();
        setContacts(res.users || res.data || []);
      } else {
        // If I am a User/Guest, show me all Owners
        res = await getAllOwnersAPI();
        setContacts(res.owners || res.data || []);
      }
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;

    const payload = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      message: text,
    };

    // Send via Socket
    socket.emit("sendMessage", payload);

    // Show on my screen
    setMessages((prev) => [...prev, { ...payload, time: new Date() }]);
    setText("");
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="card border-0 shadow-sm d-flex flex-row overflow-hidden"
        style={{ height: "85vh", borderRadius: "0" }}>
        {/* --- SIDEBAR: Target Audience --- */}
        <div className="col-lg-4 col-md-5 border-end d-flex flex-column bg-white">
          <div className="p-3 border-bottom bg-navy text-white">
            <h5 className="mb-0 fw-bold">
              {currentUser.role === "owner" ? "My Users" : "Available Owners"}
            </h5>
            <small className="opacity-75">
              Logged in as {currentUser.fullName}
            </small>
          </div>

          <div className="overflow-auto flex-grow-1">
            {contacts.length === 0 ? (
              <div className="p-5 text-center text-muted">
                <i className="bi bi-people fs-1 d-block mb-2"></i>
                No {currentUser.role === "owner" ? "users" : "owners"} found.
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => {
                    setSelectedUser(contact);
                    setMessages([]); // Resetting for fresh session as no History API exists
                  }}
                  className={`p-3 d-flex align-items-center border-bottom cursor-pointer transition-all ${selectedUser?._id === contact._id ? "bg-light border-start border-4 border-navy" : ""}`}>
                  <img
                    src={getImgURL(contact.profileImage)}
                    alt="profile"
                    className="rounded-circle me-3 border"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-bold text-navy">
                      {contact.fullName}
                    </h6>
                    <small className="text-muted">
                      {contact.city}, {contact.country}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- CHAT AREA --- */}
        <div className="col-lg-8 col-md-7 d-flex flex-column bg-light">
          {selectedUser ? (
            <>
              {/* Header */}
              <div className="p-3 bg-white border-bottom d-flex align-items-center shadow-sm">
                <img
                  src={getImgURL(selectedUser.profileImage)}
                  alt="active-chat"
                  className="rounded-circle me-3"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>
                  <small className="text-success text-capitalize">
                    {selectedUser.role} • Online
                  </small>
                </div>
              </div>

              {/* Messages List */}
              <div
                className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-white"
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/cubes.png')",
                }}>
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === currentUser._id;
                  return (
                    <div
                      key={index}
                      className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
                      <div
                        className={`p-3 rounded-4 shadow-sm ${isMe ? "bg-navy text-white" : "bg-light border border-gold"}`}
                        style={{
                          maxWidth: "70%",
                          borderRadius: isMe
                            ? "20px 20px 0 20px"
                            : "20px 20px 20px 0",
                        }}>
                        <p className="mb-0">{msg.message}</p>
                      </div>
                      <small
                        className="text-muted mt-1 mx-2"
                        style={{ fontSize: "10px" }}>
                        {new Date(msg.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-top shadow-lg">
                <form
                  className="d-flex align-items-center gap-2"
                  onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    className="form-control border-0 bg-light py-2 px-3 rounded-pill shadow-none border border-gold"
                    placeholder={`Message ${selectedUser.fullName}...`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-navy d-flex align-items-center justify-content-center p-0"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#001f3f",
                      color: "white",
                    }}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted text-center p-5">
              <div className="bg-white p-5 rounded-circle shadow-sm mb-4">
                <i className="bi bi-chat-right-dots-fill fs-1 text-navy"></i>
              </div>
              <h4 className="fw-bold text-navy">Your Messages</h4>
              <p>
                Select a {currentUser.role === "owner" ? "Guest" : "Owner"} from
                the list to start a conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
