// import React, { useState, useEffect, useRef } from "react";
// import {
//   getAllOwnersAPI,
//   getAllUsersAPI,
//   getAllAuthsAPI,
//   getChatHistoryAPI,
//   getChatAdminOwnerHistoryAPI,
//   sendMessageAPI,
//   deleteChatMessageAPI,
//   getImgURL,
// } from "../services/authService";
// import { getUser } from "../utils/storage";
// import { toast } from "react-toastify";

// const Messages = () => {
//   const [clients, setClients] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState("");
//   const [userRole, setUserRole] = useState(null);
//   const [activeTab, setActiveTab] = useState("users"); // 'users' or 'admins'
//   const scrollRef = useRef(null);

//   const currentUser = getUser();
//   const currentId = currentUser?.id || currentUser?._id;

//   useEffect(() => {
//     if (currentId) {
//       detectRoleAndLoad();
//     }
//   }, [currentId]);

//   const detectRoleAndLoad = async () => {
//     try {
//       const [ownerRes, userRes, allRes] = await Promise.all([
//         getAllOwnersAPI(),
//         getAllUsersAPI(),
//         getAllAuthsAPI(),
//       ]);

//       const ownerList = ownerRes.auths || ownerRes.owners || ownerRes.data || [];
//       const userList = userRes.auths || userRes.users || userRes.data || [];
//       const masterList = allRes.auths || allRes.data || allRes.users || [];

//       const amIOwner = ownerList.some((o) => o._id === currentId);
//       const amIAdmin = masterList.some(
//         (a) => a._id === currentId && a.role === "admin"
//       );

//       if (amIAdmin) {
//         setUserRole("admin");
//         setOwners(ownerList);
//         setClients(userList);
//       } else if (amIOwner) {
//         setUserRole("owner");
//         setClients(userList);
//         setAdmins(masterList.filter((u) => u.role === "admin"));
//       } else {
//         setUserRole("user");
//         setOwners(ownerList);
//         // User ke liye admin list empty rakhenge ya fetch hi nahi karenge sidebar ke liye
//         setAdmins([]);
//       }
//     } catch (err) {
//       console.error("Error loading contacts", err);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (selectedUser) {
//       fetchChatHistory();
//       interval = setInterval(fetchChatHistory, 4000);
//     }
//     return () => clearInterval(interval);
//   }, [selectedUser]);

//   const fetchChatHistory = async () => {
//     if (!selectedUser) return;
//     try {
//       let res;
//       if (userRole === "owner") {
//         const ownerId = currentId;
//         const otherId = selectedUser._id;
//         if (selectedUser.role === "admin") {
//           res = await getChatAdminOwnerHistoryAPI(otherId, ownerId);
//         } else {
//           res = await getChatHistoryAPI(otherId, ownerId);
//         }
//       } else if (userRole === "admin") {
//         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
//       } else {
//         res = await getChatHistoryAPI(currentId, selectedUser._id);
//       }
//       setMessages(res.data || []);
//     } catch (err) {
//       console.error("History fetch error", err);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() || !selectedUser) return;
//     const payload = { senderId: currentId, receiverId: selectedUser._id, message: text };
//     try {
//       await sendMessageAPI(payload);
//       setText("");
//       fetchChatHistory();
//     } catch (err) {
//       toast.error("Failed to send message");
//     }
//   };

//   const handleDelete = async (msgId) => {
//     if (!window.confirm("Delete this message?")) return;
//     try {
//       await deleteChatMessageAPI(msgId);
//       fetchChatHistory();
//     } catch (err) {
//       toast.error("Could not delete");
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const getBadge = (role) => {
//     if (role === "admin") return <span className="badge bg-danger ms-2">Admin</span>;
//     if (role === "owner") return <span className="badge bg-primary ms-2">Owner</span>;
//     return <span className="badge bg-success ms-2">Client</span>;
//   };

//   if (!currentUser) return <div className="p-5 text-center">Please login.</div>;

//   return (
//     <div className="container-fluid p-0 bg-light">
//       <div className="card border-0 shadow-sm d-flex flex-row overflow-hidden" style={{ height: "85vh", borderRadius: "0" }}>

//         {/* --- SIDEBAR --- */}
//         <div className="col-lg-4 border-end bg-white d-flex flex-column">
//           <div className="p-3 text-white" style={{ backgroundColor: "#001f3f" }}>
//             <h5 className="mb-0 fw-bold">Chat Box</h5>
//             <small className="opacity-75">{currentUser.fullName} ({userRole})</small>
//           </div>

//           {/* TABS: ONLY SHOW FOR OWNER */}
//           {userRole === "owner" ? (
//             <div className="d-flex bg-light border-bottom">
//               <div
//                 className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "users" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
//                 onClick={() => setActiveTab("users")}>
//                 MY CLIENTS
//               </div>
//               <div
//                 className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "admins" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
//                 onClick={() => setActiveTab("admins")}>
//                 ADMIN SUPPORT
//               </div>
//             </div>
//           ) : (
//             // Simple Header for regular User
//             <div className="p-2 bg-light border-bottom text-center fw-bold small text-muted">
//               PROPERTY OWNERS
//             </div>
//           )}

//           <div className="overflow-auto flex-grow-1">
//             {userRole === "user" ? (
//               // Case: Regular User - Always see Owners list
//               owners.map((u) => (
//                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge(u.role)} />
//               ))
//             ) : activeTab === "users" ? (
//               // Case: Owner/Admin - View Clients
//               (userRole === "owner" ? clients : owners).map((u) => (
//                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge(u.role)} />
//               ))
//             ) : (
//               // Case: Owner - View Admins
//               admins.map((u) => (
//                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge("admin")} />
//               ))
//             )}
//           </div>
//         </div>

//         {/* --- CHAT WINDOW --- */}
//         <div className="col-lg-8 bg-white d-flex flex-column">
//           {selectedUser ? (
//             <>
//               <div className="p-3 bg-white border-bottom d-flex align-items-center">
//                 <img src={getImgURL(selectedUser.profileImage)} className="rounded-circle me-3 border" style={{ width: "40px", height: "40px", objectFit: "cover" }} onError={(e) => (e.target.src = "https://placehold.co/40x40?text=U")} />
//                 <div>
//                   <h6 className="mb-0 fw-bold">{selectedUser.fullName} {getBadge(selectedUser.role)}</h6>
//                   <small className="text-muted">{selectedUser.email}</small>
//                 </div>
//               </div>

//               <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-light" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
//                 {messages.map((msg, i) => {
//                   const senderId = typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
//                   const isMe = senderId === currentId;
//                   return (
//                     <div key={i} className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
//                       <div className="d-flex align-items-center gap-2 msg-container">
//                         {isMe && (
//                           <button onClick={() => handleDelete(msg._id)} className="btn btn-link p-0 text-danger delete-icon" style={{ opacity: 0 }}>
//                             <i className="bi bi-trash3"></i>
//                           </button>
//                         )}
//                         <div className={`p-2 px-3 shadow-sm ${isMe ? "text-white" : "bg-white border"}`}
//                           style={{ maxWidth: "80%", borderRadius: isMe ? "15px 15px 0 15px" : "15px 15px 15px 0", backgroundColor: isMe ? "#001f3f" : "#fff" }}>
//                           {msg.message}
//                         </div>
//                       </div>
//                       <small className="text-muted mt-1" style={{ fontSize: "9px" }}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </small>
//                     </div>
//                   );
//                 })}
//                 <div ref={scrollRef} />
//               </div>

//               <div className="p-3 bg-white border-top">
//                 <form className="d-flex gap-2" onSubmit={handleSendMessage}>
//                   <input className="form-control rounded-pill px-4 shadow-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." required />
//                   <button type="submit" className="btn rounded-circle" style={{ backgroundColor: "#001f3f", color: "#fff", width: "45px", height: "45px" }}>
//                     <i className="bi bi-send-fill"></i>
//                   </button>
//                 </form>
//               </div>
//             </>
//           ) : (
//             <div className="m-auto text-center text-muted">
//               <i className="bi bi-chat-left-text fs-1 d-block mb-2"></i>
//               Select a contact to start chatting
//             </div>
//           )}
//         </div>
//       </div>
//       <style>{`.msg-container:hover .delete-icon { opacity: 1 !important; transition: 0.2s; } .cursor-pointer { cursor: pointer; }`}</style>
//     </div>
//   );
// };

// const ContactItem = ({ user, selectedUser, setSelectedUser, setMessages, badge }) => (
//   <div onClick={() => { setSelectedUser(user); setMessages([]); }}
//     className={`p-3 d-flex align-items-center border-bottom cursor-pointer ${selectedUser?._id === user._id ? "bg-light border-start border-4 border-primary" : ""}`}>
//     <img src={getImgURL(user.profileImage)} className="rounded-circle me-3 border" style={{ width: "45px", height: "45px", objectFit: "cover" }} onError={(e) => (e.target.src = "https://placehold.co/45x45?text=U")} />
//     <div className="flex-grow-1 overflow-hidden">
//       <div className="d-flex justify-content-between align-items-center">
//         <h6 className="mb-0 fw-bold text-truncate">{user.fullName}</h6>
//         {badge}
//       </div>
//       <small className="text-muted d-block text-truncate">{user.email}</small>
//     </div>
//   </div>
// );

// export default Messages;

import React, { useState, useEffect, useRef } from "react";
import {
  getAllOwnersAPI,
  getAllUsersAPI,
  getAllAuthsAPI,
  getChatHistoryAPI,
  getChatAdminOwnerHistoryAPI,
  sendMessageAPI,
  getImgURL,
} from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import {
  Send,
  Search,
  CheckCheck,
  Circle,
  User,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";

const Messages = () => {
  const [clients, setClients] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [owners, setOwners] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const prevMsgCount = useRef(0); // Ref to track message count for scroll fix

  const currentUser = getUser();
  const currentId = currentUser?.id || currentUser?._id;

  useEffect(() => {
    if (currentId) fetchData();
  }, [currentId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ownerRes, userRes, allRes] = await Promise.all([
        getAllOwnersAPI(),
        getAllUsersAPI(),
        getAllAuthsAPI(),
      ]);

      const ownerList = ownerRes.auths || ownerRes.owners || [];
      const userList = userRes.auths || userRes.users || [];
      const masterList = allRes.auths || allRes.data || [];

      const amIOwner = ownerList.some((o) => o._id === currentId);
      if (amIOwner) {
        setUserRole("owner");
        setClients(userList);
        setAdmins(masterList.filter((u) => u.role === "admin"));
      } else {
        setUserRole("user");
        setOwners(ownerList);
      }
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (selectedUser) {
      fetchChatHistory();
      interval = setInterval(fetchChatHistory, 4000);
    }
    return () => {
      clearInterval(interval);
      prevMsgCount.current = 0; // Reset count when user changes
    };
  }, [selectedUser]);

  const fetchChatHistory = async () => {
    try {
      let res;
      if (userRole === "owner") {
        res =
          selectedUser.role === "admin"
            ? await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId)
            : await getChatHistoryAPI(selectedUser._id, currentId);
      } else {
        res = await getChatHistoryAPI(currentId, selectedUser._id);
      }

      const newMessages = res.data || [];

      // FIX: Only scroll if message count has actually increased
      if (newMessages.length > prevMsgCount.current) {
        setMessages(newMessages);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        // Just update data without jumping scroll
        setMessages(newMessages);
      }
      prevMsgCount.current = newMessages.length;
    } catch (err) {}
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await sendMessageAPI({
        senderId: currentId,
        receiverId: selectedUser._id,
        message: text,
      });
      setText("");
      fetchChatHistory();
    } catch (err) {
      toast.error("Failed to send");
    }
  };

  if (loading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );

  return (
    <div className="container-fluid p-0 bg-light" style={{ height: "92vh" }}>
      <div className="row g-0 h-100 shadow-sm overflow-hidden">
        {/* --- LEFT SIDEBAR --- */}
        <div className="col-md-4 col-lg-3 bg-white border-end d-flex flex-column">
          {/* Profile Header: Shows YOU are Online */}
          <div className="p-3 bg-light d-flex align-items-center justify-content-between border-bottom">
            <div className="d-flex align-items-center gap-2">
              <img
                src={getImgURL(currentUser.profileImage)}
                className="rounded-circle border"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <div className="lh-1">
                <p className="mb-0 fw-bold small">{currentUser.fullName}</p>
            
            
              </div>
            </div>
          </div>

          {userRole === "owner" && (
            <div className="d-flex border-bottom bg-white shadow-sm">
              <button
                className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "users" ? "text-success border-bottom border-2 border-success" : "text-muted"}`}
                onClick={() => setActiveTab("users")}>
                CLIENTS
              </button>
              <button
                className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "admins" ? "text-success border-bottom border-2 border-success" : "text-muted"}`}
                onClick={() => setActiveTab("admins")}>
                ADMINS
              </button>
            </div>
          )}

          <div className="overflow-auto flex-grow-1">
            {(userRole === "user"
              ? owners
              : activeTab === "users"
                ? clients
                : admins
            ).map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  setSelectedUser(u);
                  setMessages([]);
                }}
                className={`p-3 d-flex align-items-center border-bottom cursor-pointer hover-effect ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-success" : ""}`}>
                <img
                  src={getImgURL(u.profileImage)}
                  className="rounded-circle me-3 border"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png")
                  }
                />
                <div className="flex-grow-1 overflow-hidden">
                  <h6 className="mb-0 fw-bold small text-truncate">
                    {u.fullName}
                  </h6>
                  <small
                    className="text-muted text-uppercase"
                    style={{ fontSize: "9px" }}>
                    {u.role}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT CHAT WINDOW --- */}
        <div className="col-md-8 col-lg-9 bg-white d-flex flex-column h-100">
          {selectedUser ? (
            <>
              {/* Header: Shows Selected Person as Online */}
              <div className="p-3 border-bottom d-flex align-items-center bg-light shadow-sm">
                <img
                  src={getImgURL(selectedUser.profileImage)}
                  className="rounded-circle me-3 border"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>
               
               
                </div>
              </div>

              {/* Chat Content */}
              <div
                className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-2"
                style={{
                  backgroundColor: "#e5ddd5",
                  backgroundImage:
                    "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                }}>
                {messages.map((msg, i) => {
                  const isMe =
                    (typeof msg.senderId === "object"
                      ? msg.senderId._id
                      : msg.senderId) === currentId;
                  return (
                    <div
                      key={i}
                      className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                      <div
                        className={`p-2 px-3 shadow-sm ${isMe ? "bg-whatsapp-me rounded-me" : "bg-white rounded-other"}`}
                        style={{ maxWidth: "70%", fontSize: "14px" }}>
                        {msg.message}
                        <div
                          className="d-flex align-items-center justify-content-end gap-1 mt-1"
                          style={{ fontSize: "9px", opacity: 0.6 }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {isMe && (
                            <CheckCheck size={14} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-light border-top">
                <form
                  className="d-flex gap-2 align-items-center"
                  onSubmit={handleSendMessage}>
                  <input
                    className="form-control rounded-pill border-0 px-4 py-2 shadow-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                  />
                  <button
                    type="submit"
                    className="btn btn-success rounded-circle shadow"
                    style={{ width: "45px", height: "45px" }}>
                    <Send size={18} color="white" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="m-auto text-center py-5">
              <div className="bg-light rounded-circle p-5 d-inline-block mb-3 shadow-sm">
                <User size={60} className="text-muted opacity-25" />
              </div>
              <h4 className="fw-bold text-dark">Select a Chat</h4>
              <p className="text-muted small">
                Select a client or owner to start messaging.
              </p>
              <div className="mt-5 text-muted small">
                <ShieldCheck size={14} /> Secure Messaging
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .bg-whatsapp-me { background-color: #dcf8c6; }
        .rounded-me { border-radius: 10px 0px 10px 10px; }
        .rounded-other { border-radius: 0px 10px 10px 10px; }
        .hover-effect:hover { background-color: #f8f9fa; }
      `}</style>
    </div>
  );
};

export default Messages;