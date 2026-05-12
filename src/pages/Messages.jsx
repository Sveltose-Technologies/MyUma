import React, { useState, useEffect, useRef } from "react";

// ==========================================
// STATIC DATA (REPLACING API CALLS)
// ==========================================
const STATIC_USERS = [
  {
    _id: "69d8a805b7244964b974690d",
    fullName: "Parag joshi",
    email: "paragsveltose20@gmail.com",
    role: "user",
    address: "Ujjain",
    city: "Ujjain",
    country: "India",
  },
  {
    _id: "69e758ca84ad9cfae2caf270",
    fullName: "Shivam rao",
    email: "ritutestar17@gmail.com",
    role: "user",
    address: "Indore",
    city: "Indore",
    country: "India",
  },
  {
    _id: "69ff278b86074441260ae040",
    fullName: "Rituraj",
    email: "riturajsinghsveltose@gmail.com",
    role: "user",
    address: "12 main road",
    city: "Hyderabad",
    country: "India",
  },
  {
    _id: "69ff38da86074441260ae3fa",
    fullName: "Shubhangi (Client)",
    email: "shubhangimahajan2311@gmail.com",
    role: "user",
    address: "Indore",
    city: "Indore",
    country: "India",
  },
];

const STATIC_OWNERS = [
  {
    _id: "6a01b9c886074441260aed5a",
    fullName: "Shubhangi (Owner)",
    email: "mahajanshubhangi2326@gmail.com",
    role: "owner",
    address: "Indore",
    city: "Indore",
    country: "India",
  },
];

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // Get current user from localStorage to check role
  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    role: "user",
    _id: "guest",
  };

  useEffect(() => {
    // Logic: If I am owner, show users. If I am user, show owners.
    if (currentUser.role === "owner") {
      setContacts(STATIC_USERS);
    } else {
      setContacts(STATIC_OWNERS);
    }
  }, [currentUser.role]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;

    const newMessage = {
      senderId: currentUser._id,
      message: text,
      time: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setText("");

    // Optional: Auto-reply to make it feel alive
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: selectedUser._id,
          message: `Hello ${currentUser.fullName}, this is a static response from ${selectedUser.fullName}.`,
          time: new Date().toISOString(),
        },
      ]);
    }, 800);
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="card border-0 shadow-sm d-flex flex-row"
        style={{ height: "85vh", overflow: "hidden" }}>
        {/* SIDEBAR: Static List */}
        <div className="col-lg-4 col-md-5 border-end d-flex flex-column bg-white">
          <div
            className="p-3 border-bottom text-white"
            style={{ backgroundColor: "#001f3f" }}>
            <h5 className="mb-0 fw-bold">
              {currentUser.role === "owner" ? "My Clients" : "Contact Owners"}
            </h5>
            <small className="opacity-75">Demo Mode (No API)</small>
          </div>

          <div className="overflow-auto flex-grow-1">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => {
                  setSelectedUser(contact);
                  setMessages([]); // Start fresh conversation
                }}
                className={`p-3 d-flex align-items-center border-bottom cursor-pointer ${selectedUser?._id === contact._id ? "bg-light border-start border-4 border-primary" : ""}`}
                style={{ cursor: "pointer" }}>
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px" }}>
                  {contact.fullName.charAt(0)}
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">{contact.fullName}</h6>
                  <small className="text-muted">{contact.email}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="col-lg-8 col-md-7 d-flex flex-column bg-light">
          {selectedUser ? (
            <>
              <div className="p-3 bg-white border-bottom shadow-sm">
                <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>
                <span className="badge bg-success">Online</span>
              </div>

              <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-white">
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === currentUser._id;
                  return (
                    <div
                      key={index}
                      className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
                      <div
                        className={`p-2 px-3 shadow-sm ${isMe ? "bg-primary text-white" : "bg-light border"}`}
                        style={{
                          maxWidth: "70%",
                          borderRadius: isMe
                            ? "15px 15px 0 15px"
                            : "15px 15px 15px 0",
                        }}>
                        {msg.message}
                      </div>
                      <small
                        className="text-muted mt-1"
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

              <div className="p-3 bg-white border-top">
                <form className="d-flex gap-2" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-circle"
                    style={{ backgroundColor: "#001f3f" }}>
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
              <h4>Messages</h4>
              <p>
                Select a {currentUser.role === "owner" ? "user" : "owner"} from
                the sidebar to chat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
