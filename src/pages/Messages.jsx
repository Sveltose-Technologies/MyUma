import React, { useState, useEffect, useRef } from "react";
import {
  getAllOwnersAPI,
  getAllUsersAPI,
  getAllAuthsAPI, // <--- Use this to find Admins
  getChatHistoryAPI,
  sendMessageAPI,
  deleteChatMessageAPI,
  getImgURL,
} from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";

const Messages = () => {
  const [clients, setClients] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [owners, setOwners] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const scrollRef = useRef(null);

  const currentUser = getUser();
  const currentId = currentUser?.id || currentUser?._id;

  useEffect(() => {
    if (currentId) {
      detectRoleAndLoad();
    }
  }, [currentId]);

  const detectRoleAndLoad = async () => {
    try {
      // Parallel API calls
      const [ownerRes, userRes, allRes] = await Promise.all([
        getAllOwnersAPI(),
        getAllUsersAPI(),
        getAllAuthsAPI(),
      ]);

      // Extract lists using provided API keys
      const ownerList =
        ownerRes.auths || ownerRes.owners || ownerRes.data || [];
      const userList = userRes.auths || userRes.users || userRes.data || [];
      const masterList = allRes.auths || allRes.data || allRes.users || [];

      // Logic to find current user role
      const amIOwner = ownerList.some((o) => o._id === currentId);
      const amIAdmin = masterList.some(
        (a) => a._id === currentId && a.role === "admin",
      );

      if (amIAdmin) {
        setUserRole("admin");
        setOwners(ownerList);
        setClients(userList);
      } else if (amIOwner) {
        setUserRole("owner");
        setClients(userList);
        // Filter admins from the master list
        const filteredAdmins = masterList.filter((u) => u.role === "admin");
        setAdmins(filteredAdmins);
      } else {
        setUserRole("user");
        setOwners(ownerList);
        const filteredAdmins = masterList.filter((u) => u.role === "admin");
        setAdmins(filteredAdmins);
      }
    } catch (err) {
      console.error("Error loading contacts", err);
    }
  };

  useEffect(() => {
    let interval;
    if (selectedUser) {
      fetchChatHistory();
      interval = setInterval(fetchChatHistory, 4000);
    }
    return () => clearInterval(interval);
  }, [selectedUser]);

  const fetchChatHistory = async () => {
    if (!selectedUser) return;
    try {
      let userId, ownerId;
      // Pairing for chat history
      if (userRole === "owner") {
        ownerId = currentId;
        userId = selectedUser._id;
      } else {
        userId = currentId;
        ownerId = selectedUser._id;
      }
      const res = await getChatHistoryAPI(userId, ownerId);
      setMessages(res.data || []);
    } catch (err) {
      console.error("History fetch error", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;

    const payload = {
      senderId: currentId,
      receiverId: selectedUser._id,
      message: text,
    };

    try {
      await sendMessageAPI(payload);
      setText("");
      fetchChatHistory();
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const handleDelete = async (msgId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteChatMessageAPI(msgId);
      toast.success("Message deleted");
      fetchChatHistory();
    } catch (err) {
      toast.error("Could not delete");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBadge = (role) => {
    if (role === "admin")
      return <span className="badge bg-danger ms-2">Admin</span>;
    if (role === "owner")
      return <span className="badge bg-primary ms-2">Owner</span>;
    return <span className="badge bg-success ms-2">Client</span>;
  };

  if (!currentUser) return <div className="p-5 text-center">Please login.</div>;

  return (
    <div className="container-fluid p-0 bg-light">
      <div
        className="card border-0 shadow-sm d-flex flex-row overflow-hidden"
        style={{ height: "85vh", borderRadius: "0" }}>
        {/* --- SIDEBAR --- */}
        <div className="col-lg-4 border-end bg-white d-flex flex-column">
          <div
            className="p-3 text-white"
            style={{ backgroundColor: "#001f3f" }}>
            <h5 className="mb-0 fw-bold">Chat Box</h5>
            <small className="opacity-75">
              {currentUser.fullName} ({userRole})
            </small>
          </div>

          {/* TAB LOGIC */}
          {(userRole === "owner" || userRole === "user") && (
            <div className="d-flex bg-light border-bottom">
              <div
                className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "users" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
                onClick={() => setActiveTab("users")}
                style={{ cursor: "pointer" }}>
                {userRole === "owner" ? "MY CLIENTS" : "PROPERTY OWNERS"}
              </div>
              <div
                className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "admins" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
                onClick={() => setActiveTab("admins")}
                style={{ cursor: "pointer" }}>
                ADMIN 
              </div>
            </div>
          )}

          <div className="overflow-auto flex-grow-1">
            {activeTab === "users" ? (
              (userRole === "owner" ? clients : owners).length > 0 ? (
                (userRole === "owner" ? clients : owners).map((u) => (
                  <ContactItem
                    key={u._id}
                    user={u}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    setMessages={setMessages}
                    badge={getBadge(u.role)}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-muted small">
                  No clients found.
                </div>
              )
            ) : admins.length > 0 ? (
              admins.map((u) => (
                <ContactItem
                  key={u._id}
                  user={u}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setMessages={setMessages}
                  badge={getBadge("admin")}
                />
              ))
            ) : (
              <div className="p-4 text-center text-muted small">
                No Admin support available.
              </div>
            )}
          </div>
        </div>

        {/* --- CHAT WINDOW --- */}
        <div className="col-lg-8 bg-white d-flex flex-column">
          {selectedUser ? (
            <>
              <div className="p-3 bg-white border-bottom d-flex align-items-center">
                <img
                  src={getImgURL(selectedUser.profileImage)}
                  className="rounded-circle me-3 border"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src = "https://placehold.co/40x40?text=User")
                  }
                />
                <div>
                  <h6 className="mb-0 fw-bold">
                    {selectedUser.fullName} {getBadge(selectedUser.role)}
                  </h6>
                  <small className="text-muted">{selectedUser.email}</small>
                </div>
              </div>

              <div
                className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-light"
                style={{
                  backgroundImage:
                    'url("https://www.transparenttextures.com/patterns/cubes.png")',
                }}>
                {messages.length === 0 ? (
                  <div className="text-center my-auto text-muted">
                    No messages found.
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const senderId =
                      typeof msg.senderId === "object"
                        ? msg.senderId._id
                        : msg.senderId;
                    const isMe = senderId === currentId;
                    return (
                      <div
                        key={i}
                        className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
                        <div className="d-flex align-items-center gap-2 msg-container">
                          {isMe && (
                            <button
                              onClick={() => handleDelete(msg._id)}
                              className="btn btn-link p-0 text-danger delete-icon"
                              style={{ opacity: 0 }}>
                              <i className="bi bi-trash3"></i>
                            </button>
                          )}
                          <div
                            className={`p-2 px-3 shadow-sm ${isMe ? "text-white" : "bg-white border text-dark"}`}
                            style={{
                              maxWidth: "80%",
                              borderRadius: isMe
                                ? "15px 15px 0 15px"
                                : "15px 15px 15px 0",
                              backgroundColor: isMe ? "#001f3f" : "#fff",
                            }}>
                            {msg.message}
                          </div>
                        </div>
                        <small
                          className="text-muted mt-1"
                          style={{ fontSize: "9px" }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    );
                  })
                )}
                <div ref={scrollRef} />
              </div>

              <div className="p-3 bg-white border-top">
                <form className="d-flex gap-2" onSubmit={handleSendMessage}>
                  <input
                    className="form-control rounded-pill px-4 shadow-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    required
                  />
                  <button
                    type="submit"
                    className="btn rounded-circle"
                    style={{
                      backgroundColor: "#001f3f",
                      color: "#fff",
                      width: "45px",
                      height: "45px",
                    }}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-muted">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
      <style>{`.msg-container:hover .delete-icon { opacity: 1 !important; }`}</style>
    </div>
  );
};

const ContactItem = ({
  user,
  selectedUser,
  setSelectedUser,
  setMessages,
  badge,
}) => (
  <div
    onClick={() => {
      setSelectedUser(user);
      setMessages([]);
    }}
    className={`p-3 d-flex align-items-center border-bottom cursor-pointer ${selectedUser?._id === user._id ? "bg-light border-start border-4 border-primary" : ""}`}
    style={{ cursor: "pointer" }}>
    <img
      src={getImgURL(user.profileImage)}
      className="rounded-circle me-3 border"
      style={{ width: "45px", height: "45px", objectFit: "cover" }}
      onError={(e) => (e.target.src = "https://placehold.co/45x45?text=User")}
    />
    <div className="flex-grow-1 overflow-hidden">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold text-truncate">{user.fullName}</h6>
        {badge}
      </div>
      <small className="text-muted d-block text-truncate">{user.email}</small>
    </div>
  </div>
);

export default Messages;
