// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import {
// // // // //   getAllOwnersAPI,
// // // // //   getAllUsersAPI,
// // // // //   getAllAuthsAPI,
// // // // //   getChatHistoryAPI,
// // // // //   getChatAdminOwnerHistoryAPI,
// // // // //   sendMessageAPI,
// // // // //   deleteChatMessageAPI,
// // // // //   getImgURL,
// // // // // } from "../services/authService";
// // // // // import { getUser } from "../utils/storage";
// // // // // import { toast } from "react-toastify";

// // // // // const Messages = () => {
// // // // //   const [clients, setClients] = useState([]);
// // // // //   const [admins, setAdmins] = useState([]);
// // // // //   const [owners, setOwners] = useState([]);
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [selectedUser, setSelectedUser] = useState(null);
// // // // //   const [text, setText] = useState("");
// // // // //   const [userRole, setUserRole] = useState(null);
// // // // //   const [activeTab, setActiveTab] = useState("users"); // 'users' or 'admins'
// // // // //   const scrollRef = useRef(null);

// // // // //   const currentUser = getUser();
// // // // //   const currentId = currentUser?.id || currentUser?._id;

// // // // //   useEffect(() => {
// // // // //     if (currentId) {
// // // // //       detectRoleAndLoad();
// // // // //     }
// // // // //   }, [currentId]);

// // // // //   const detectRoleAndLoad = async () => {
// // // // //     try {
// // // // //       const [ownerRes, userRes, allRes] = await Promise.all([
// // // // //         getAllOwnersAPI(),
// // // // //         getAllUsersAPI(),
// // // // //         getAllAuthsAPI(),
// // // // //       ]);

// // // // //       const ownerList = ownerRes.auths || ownerRes.owners || ownerRes.data || [];
// // // // //       const userList = userRes.auths || userRes.users || userRes.data || [];
// // // // //       const masterList = allRes.auths || allRes.data || allRes.users || [];

// // // // //       const amIOwner = ownerList.some((o) => o._id === currentId);
// // // // //       const amIAdmin = masterList.some(
// // // // //         (a) => a._id === currentId && a.role === "admin"
// // // // //       );

// // // // //       if (amIAdmin) {
// // // // //         setUserRole("admin");
// // // // //         setOwners(ownerList);
// // // // //         setClients(userList);
// // // // //       } else if (amIOwner) {
// // // // //         setUserRole("owner");
// // // // //         setClients(userList);
// // // // //         setAdmins(masterList.filter((u) => u.role === "admin"));
// // // // //       } else {
// // // // //         setUserRole("user");
// // // // //         setOwners(ownerList);
// // // // //         // User ke liye admin list empty rakhenge ya fetch hi nahi karenge sidebar ke liye
// // // // //         setAdmins([]);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Error loading contacts", err);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     let interval;
// // // // //     if (selectedUser) {
// // // // //       fetchChatHistory();
// // // // //       interval = setInterval(fetchChatHistory, 4000);
// // // // //     }
// // // // //     return () => clearInterval(interval);
// // // // //   }, [selectedUser]);

// // // // //   const fetchChatHistory = async () => {
// // // // //     if (!selectedUser) return;
// // // // //     try {
// // // // //       let res;
// // // // //       if (userRole === "owner") {
// // // // //         const ownerId = currentId;
// // // // //         const otherId = selectedUser._id;
// // // // //         if (selectedUser.role === "admin") {
// // // // //           res = await getChatAdminOwnerHistoryAPI(otherId, ownerId);
// // // // //         } else {
// // // // //           res = await getChatHistoryAPI(otherId, ownerId);
// // // // //         }
// // // // //       } else if (userRole === "admin") {
// // // // //         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
// // // // //       } else {
// // // // //         res = await getChatHistoryAPI(currentId, selectedUser._id);
// // // // //       }
// // // // //       setMessages(res.data || []);
// // // // //     } catch (err) {
// // // // //       console.error("History fetch error", err);
// // // // //     }
// // // // //   };

// // // // //   const handleSendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!text.trim() || !selectedUser) return;
// // // // //     const payload = { senderId: currentId, receiverId: selectedUser._id, message: text };
// // // // //     try {
// // // // //       await sendMessageAPI(payload);
// // // // //       setText("");
// // // // //       fetchChatHistory();
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to send message");
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (msgId) => {
// // // // //     if (!window.confirm("Delete this message?")) return;
// // // // //     try {
// // // // //       await deleteChatMessageAPI(msgId);
// // // // //       fetchChatHistory();
// // // // //     } catch (err) {
// // // // //       toast.error("Could not delete");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [messages]);

// // // // //   const getBadge = (role) => {
// // // // //     if (role === "admin") return <span className="badge bg-danger ms-2">Admin</span>;
// // // // //     if (role === "owner") return <span className="badge bg-primary ms-2">Owner</span>;
// // // // //     return <span className="badge bg-success ms-2">Client</span>;
// // // // //   };

// // // // //   if (!currentUser) return <div className="p-5 text-center">Please login.</div>;

// // // // //   return (
// // // // //     <div className="container-fluid p-0 bg-light">
// // // // //       <div className="card border-0 shadow-sm d-flex flex-row overflow-hidden" style={{ height: "85vh", borderRadius: "0" }}>

// // // // //         {/* --- SIDEBAR --- */}
// // // // //         <div className="col-lg-4 border-end bg-white d-flex flex-column">
// // // // //           <div className="p-3 text-white" style={{ backgroundColor: "#001f3f" }}>
// // // // //             <h5 className="mb-0 fw-bold">Chat Box</h5>
// // // // //             <small className="opacity-75">{currentUser.fullName} ({userRole})</small>
// // // // //           </div>

// // // // //           {/* TABS: ONLY SHOW FOR OWNER */}
// // // // //           {userRole === "owner" ? (
// // // // //             <div className="d-flex bg-light border-bottom">
// // // // //               <div
// // // // //                 className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "users" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
// // // // //                 onClick={() => setActiveTab("users")}>
// // // // //                 MY CLIENTS
// // // // //               </div>
// // // // //               <div
// // // // //                 className={`flex-grow-1 py-2 text-center cursor-pointer fw-bold small ${activeTab === "admins" ? "bg-white border-bottom border-3 border-primary text-primary" : "text-muted"}`}
// // // // //                 onClick={() => setActiveTab("admins")}>
// // // // //                 ADMIN SUPPORT
// // // // //               </div>
// // // // //             </div>
// // // // //           ) : (
// // // // //             // Simple Header for regular User
// // // // //             <div className="p-2 bg-light border-bottom text-center fw-bold small text-muted">
// // // // //               PROPERTY OWNERS
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="overflow-auto flex-grow-1">
// // // // //             {userRole === "user" ? (
// // // // //               // Case: Regular User - Always see Owners list
// // // // //               owners.map((u) => (
// // // // //                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge(u.role)} />
// // // // //               ))
// // // // //             ) : activeTab === "users" ? (
// // // // //               // Case: Owner/Admin - View Clients
// // // // //               (userRole === "owner" ? clients : owners).map((u) => (
// // // // //                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge(u.role)} />
// // // // //               ))
// // // // //             ) : (
// // // // //               // Case: Owner - View Admins
// // // // //               admins.map((u) => (
// // // // //                 <ContactItem key={u._id} user={u} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setMessages={setMessages} badge={getBadge("admin")} />
// // // // //               ))
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* --- CHAT WINDOW --- */}
// // // // //         <div className="col-lg-8 bg-white d-flex flex-column">
// // // // //           {selectedUser ? (
// // // // //             <>
// // // // //               <div className="p-3 bg-white border-bottom d-flex align-items-center">
// // // // //                 <img src={getImgURL(selectedUser.profileImage)} className="rounded-circle me-3 border" style={{ width: "40px", height: "40px", objectFit: "cover" }} onError={(e) => (e.target.src = "https://placehold.co/40x40?text=U")} />
// // // // //                 <div>
// // // // //                   <h6 className="mb-0 fw-bold">{selectedUser.fullName} {getBadge(selectedUser.role)}</h6>
// // // // //                   <small className="text-muted">{selectedUser.email}</small>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-light" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
// // // // //                 {messages.map((msg, i) => {
// // // // //                   const senderId = typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
// // // // //                   const isMe = senderId === currentId;
// // // // //                   return (
// // // // //                     <div key={i} className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
// // // // //                       <div className="d-flex align-items-center gap-2 msg-container">
// // // // //                         {isMe && (
// // // // //                           <button onClick={() => handleDelete(msg._id)} className="btn btn-link p-0 text-danger delete-icon" style={{ opacity: 0 }}>
// // // // //                             <i className="bi bi-trash3"></i>
// // // // //                           </button>
// // // // //                         )}
// // // // //                         <div className={`p-2 px-3 shadow-sm ${isMe ? "text-white" : "bg-white border"}`}
// // // // //                           style={{ maxWidth: "80%", borderRadius: isMe ? "15px 15px 0 15px" : "15px 15px 15px 0", backgroundColor: isMe ? "#001f3f" : "#fff" }}>
// // // // //                           {msg.message}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <small className="text-muted mt-1" style={{ fontSize: "9px" }}>
// // // // //                         {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// // // // //                       </small>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //                 <div ref={scrollRef} />
// // // // //               </div>

// // // // //               <div className="p-3 bg-white border-top">
// // // // //                 <form className="d-flex gap-2" onSubmit={handleSendMessage}>
// // // // //                   <input className="form-control rounded-pill px-4 shadow-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." required />
// // // // //                   <button type="submit" className="btn rounded-circle" style={{ backgroundColor: "#001f3f", color: "#fff", width: "45px", height: "45px" }}>
// // // // //                     <i className="bi bi-send-fill"></i>
// // // // //                   </button>
// // // // //                 </form>
// // // // //               </div>
// // // // //             </>
// // // // //           ) : (
// // // // //             <div className="m-auto text-center text-muted">
// // // // //               <i className="bi bi-chat-left-text fs-1 d-block mb-2"></i>
// // // // //               Select a contact to start chatting
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //       <style>{`.msg-container:hover .delete-icon { opacity: 1 !important; transition: 0.2s; } .cursor-pointer { cursor: pointer; }`}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const ContactItem = ({ user, selectedUser, setSelectedUser, setMessages, badge }) => (
// // // // //   <div onClick={() => { setSelectedUser(user); setMessages([]); }}
// // // // //     className={`p-3 d-flex align-items-center border-bottom cursor-pointer ${selectedUser?._id === user._id ? "bg-light border-start border-4 border-primary" : ""}`}>
// // // // //     <img src={getImgURL(user.profileImage)} className="rounded-circle me-3 border" style={{ width: "45px", height: "45px", objectFit: "cover" }} onError={(e) => (e.target.src = "https://placehold.co/45x45?text=U")} />
// // // // //     <div className="flex-grow-1 overflow-hidden">
// // // // //       <div className="d-flex justify-content-between align-items-center">
// // // // //         <h6 className="mb-0 fw-bold text-truncate">{user.fullName}</h6>
// // // // //         {badge}
// // // // //       </div>
// // // // //       <small className="text-muted d-block text-truncate">{user.email}</small>
// // // // //     </div>
// // // // //   </div>
// // // // // );

// // // // // export default Messages;

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import {
// // // // //   getAllOwnersAPI,
// // // // //   getAllUsersAPI,
// // // // //   getAllAuthsAPI,
// // // // //   getChatHistoryAPI,
// // // // //   getChatAdminOwnerHistoryAPI,
// // // // //   sendMessageAPI,
// // // // //   getImgURL,
// // // // // } from "../services/authService";
// // // // // import { getUser } from "../utils/storage";
// // // // // import { toast } from "react-toastify";
// // // // // import {
// // // // //   Send,
// // // // //   Search,
// // // // //   CheckCheck,
// // // // //   Circle,
// // // // //   User,
// // // // //   MoreVertical,
// // // // //   ShieldCheck,
// // // // // } from "lucide-react";

// // // // // const Messages = () => {
// // // // //   const [clients, setClients] = useState([]);
// // // // //   const [admins, setAdmins] = useState([]);
// // // // //   const [owners, setOwners] = useState([]);
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [selectedUser, setSelectedUser] = useState(null);
// // // // //   const [text, setText] = useState("");
// // // // //   const [userRole, setUserRole] = useState(null);
// // // // //   const [activeTab, setActiveTab] = useState("users");
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const scrollRef = useRef(null);
// // // // //   const prevMsgCount = useRef(0); // Ref to track message count for scroll fix

// // // // //   const currentUser = getUser();
// // // // //   const currentId = currentUser?.id || currentUser?._id;

// // // // //   useEffect(() => {
// // // // //     if (currentId) fetchData();
// // // // //   }, [currentId]);

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const [ownerRes, userRes, allRes] = await Promise.all([
// // // // //         getAllOwnersAPI(),
// // // // //         getAllUsersAPI(),
// // // // //         getAllAuthsAPI(),
// // // // //       ]);

// // // // //       const ownerList = ownerRes.auths || ownerRes.owners || [];
// // // // //       const userList = userRes.auths || userRes.users || [];
// // // // //       const masterList = allRes.auths || allRes.data || [];

// // // // //       const amIOwner = ownerList.some((o) => o._id === currentId);
// // // // //       if (amIOwner) {
// // // // //         setUserRole("owner");
// // // // //         setClients(userList);
// // // // //         setAdmins(masterList.filter((u) => u.role === "admin"));
// // // // //       } else {
// // // // //         setUserRole("user");
// // // // //         setOwners(ownerList);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to load contacts");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     let interval;
// // // // //     if (selectedUser) {
// // // // //       fetchChatHistory();
// // // // //       interval = setInterval(fetchChatHistory, 4000);
// // // // //     }
// // // // //     return () => {
// // // // //       clearInterval(interval);
// // // // //       prevMsgCount.current = 0; // Reset count when user changes
// // // // //     };
// // // // //   }, [selectedUser]);

// // // // //   const fetchChatHistory = async () => {
// // // // //     try {
// // // // //       let res;
// // // // //       if (userRole === "owner") {
// // // // //         res =
// // // // //           selectedUser.role === "admin"
// // // // //             ? await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId)
// // // // //             : await getChatHistoryAPI(selectedUser._id, currentId);
// // // // //       } else {
// // // // //         res = await getChatHistoryAPI(currentId, selectedUser._id);
// // // // //       }

// // // // //       const newMessages = res.data || [];

// // // // //       // FIX: Only scroll if message count has actually increased
// // // // //       if (newMessages.length > prevMsgCount.current) {
// // // // //         setMessages(newMessages);
// // // // //         setTimeout(() => {
// // // // //           scrollRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //         }, 100);
// // // // //       } else {
// // // // //         // Just update data without jumping scroll
// // // // //         setMessages(newMessages);
// // // // //       }
// // // // //       prevMsgCount.current = newMessages.length;
// // // // //     } catch (err) {}
// // // // //   };

// // // // //   const handleSendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!text.trim()) return;
// // // // //     try {
// // // // //       await sendMessageAPI({
// // // // //         senderId: currentId,
// // // // //         receiverId: selectedUser._id,
// // // // //         message: text,
// // // // //       });
// // // // //       setText("");
// // // // //       fetchChatHistory();
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to send");
// // // // //     }
// // // // //   };

// // // // //   if (loading)
// // // // //     return (
// // // // //       <div className="vh-100 d-flex align-items-center justify-content-center">
// // // // //         Loading...
// // // // //       </div>
// // // // //     );

// // // // //   return (
// // // // //     <div className="container-fluid p-0 bg-light" style={{ height: "92vh" }}>
// // // // //       <div className="row g-0 h-100 shadow-sm overflow-hidden">
// // // // //         {/* --- LEFT SIDEBAR --- */}
// // // // //         <div className="col-md-4 col-lg-3 bg-white border-end d-flex flex-column">
// // // // //           {/* Profile Header: Shows YOU are Online */}
// // // // //           <div className="p-3 bg-light d-flex align-items-center justify-content-between border-bottom">
// // // // //             <div className="d-flex align-items-center gap-2">
// // // // //               <img
// // // // //                 src={getImgURL(currentUser.profileImage)}
// // // // //                 className="rounded-circle border"
// // // // //                 style={{ width: "40px", height: "40px", objectFit: "cover" }}
// // // // //               />
// // // // //               <div className="lh-1">
// // // // //                 <p className="mb-0 fw-bold small">{currentUser.fullName}</p>

// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {userRole === "owner" && (
// // // // //             <div className="d-flex border-bottom bg-white shadow-sm">
// // // // //               <button
// // // // //                 className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "users" ? "text-success border-bottom border-2 border-success" : "text-muted"}`}
// // // // //                 onClick={() => setActiveTab("users")}>
// // // // //                 CLIENTS
// // // // //               </button>
// // // // //               <button
// // // // //                 className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "admins" ? "text-success border-bottom border-2 border-success" : "text-muted"}`}
// // // // //                 onClick={() => setActiveTab("admins")}>
// // // // //                 ADMINS
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="overflow-auto flex-grow-1">
// // // // //             {(userRole === "user"
// // // // //               ? owners
// // // // //               : activeTab === "users"
// // // // //                 ? clients
// // // // //                 : admins
// // // // //             ).map((u) => (
// // // // //               <div
// // // // //                 key={u._id}
// // // // //                 onClick={() => {
// // // // //                   setSelectedUser(u);
// // // // //                   setMessages([]);
// // // // //                 }}
// // // // //                 className={`p-3 d-flex align-items-center border-bottom cursor-pointer hover-effect ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-success" : ""}`}>
// // // // //                 <img
// // // // //                   src={getImgURL(u.profileImage)}
// // // // //                   className="rounded-circle me-3 border"
// // // // //                   style={{ width: "45px", height: "45px", objectFit: "cover" }}
// // // // //                   onError={(e) =>
// // // // //                     (e.target.src =
// // // // //                       "https://cdn-icons-png.flaticon.com/512/149/149071.png")
// // // // //                   }
// // // // //                 />
// // // // //                 <div className="flex-grow-1 overflow-hidden">
// // // // //                   <h6 className="mb-0 fw-bold small text-truncate">
// // // // //                     {u.fullName}
// // // // //                   </h6>
// // // // //                   <small
// // // // //                     className="text-muted text-uppercase"
// // // // //                     style={{ fontSize: "9px" }}>
// // // // //                     {u.role}
// // // // //                   </small>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* --- RIGHT CHAT WINDOW --- */}
// // // // //         <div className="col-md-8 col-lg-9 bg-white d-flex flex-column h-100">
// // // // //           {selectedUser ? (
// // // // //             <>
// // // // //               {/* Header: Shows Selected Person as Online */}
// // // // //               <div className="p-3 border-bottom d-flex align-items-center bg-light shadow-sm">
// // // // //                 <img
// // // // //                   src={getImgURL(selectedUser.profileImage)}
// // // // //                   className="rounded-circle me-3 border"
// // // // //                   style={{ width: "40px", height: "40px", objectFit: "cover" }}
// // // // //                 />
// // // // //                 <div className="flex-grow-1">
// // // // //                   <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>

// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Chat Content */}
// // // // //               <div
// // // // //                 className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-2"
// // // // //                 style={{
// // // // //                   backgroundColor: "#e5ddd5",
// // // // //                   backgroundImage:
// // // // //                     "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
// // // // //                 }}>
// // // // //                 {messages.map((msg, i) => {
// // // // //                   const isMe =
// // // // //                     (typeof msg.senderId === "object"
// // // // //                       ? msg.senderId._id
// // // // //                       : msg.senderId) === currentId;
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={i}
// // // // //                       className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
// // // // //                       <div
// // // // //                         className={`p-2 px-3 shadow-sm ${isMe ? "bg-whatsapp-me rounded-me" : "bg-white rounded-other"}`}
// // // // //                         style={{ maxWidth: "70%", fontSize: "14px" }}>
// // // // //                         {msg.message}
// // // // //                         <div
// // // // //                           className="d-flex align-items-center justify-content-end gap-1 mt-1"
// // // // //                           style={{ fontSize: "9px", opacity: 0.6 }}>
// // // // //                           {new Date(msg.createdAt).toLocaleTimeString([], {
// // // // //                             hour: "2-digit",
// // // // //                             minute: "2-digit",
// // // // //                           })}
// // // // //                           {isMe && (
// // // // //                             <CheckCheck size={14} className="text-primary" />
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //                 <div ref={scrollRef} />
// // // // //               </div>

// // // // //               {/* Input */}
// // // // //               <div className="p-3 bg-light border-top">
// // // // //                 <form
// // // // //                   className="d-flex gap-2 align-items-center"
// // // // //                   onSubmit={handleSendMessage}>
// // // // //                   <input
// // // // //                     className="form-control rounded-pill border-0 px-4 py-2 shadow-none"
// // // // //                     value={text}
// // // // //                     onChange={(e) => setText(e.target.value)}
// // // // //                     placeholder="Type a message"
// // // // //                   />
// // // // //                   <button
// // // // //                     type="submit"
// // // // //                     className="btn btn-success rounded-circle shadow"
// // // // //                     style={{ width: "45px", height: "45px" }}>
// // // // //                     <Send size={18} color="white" />
// // // // //                   </button>
// // // // //                 </form>
// // // // //               </div>
// // // // //             </>
// // // // //           ) : (
// // // // //             <div className="m-auto text-center py-5">
// // // // //               <div className="bg-light rounded-circle p-5 d-inline-block mb-3 shadow-sm">
// // // // //                 <User size={60} className="text-muted opacity-25" />
// // // // //               </div>
// // // // //               <h4 className="fw-bold text-dark">Select a Chat</h4>
// // // // //               <p className="text-muted small">
// // // // //                 Select a client or owner to start messaging.
// // // // //               </p>
// // // // //               <div className="mt-5 text-muted small">
// // // // //                 <ShieldCheck size={14} /> Secure Messaging
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       <style>{`
// // // // //         .bg-whatsapp-me { background-color: #dcf8c6; }
// // // // //         .rounded-me { border-radius: 10px 0px 10px 10px; }
// // // // //         .rounded-other { border-radius: 0px 10px 10px 10px; }
// // // // //         .hover-effect:hover { background-color: #f8f9fa; }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Messages;

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import {
// // // // //   getAllOwnersAPI,
// // // // //   getAllUsersAPI,
// // // // //   getAllAuthsAPI,
// // // // //   // Chat Specific APIs
// // // // //   getChatByUserOwnerAPI, // /chat/get-by-user-owner/:userId/:ownerId
// // // // //   getChatByAdminOwnerAPI, // /chat/get-by-admin-owner/:adminId/:ownerId
// // // // //   sendMessageAPI, // /chat/send
// // // // //   getImgURL,
// // // // // } from "../services/authService";
// // // // // import { getUser } from "../utils/storage";
// // // // // import { toast } from "react-toastify";
// // // // // import {
// // // // //   Send,
// // // // //   User,
// // // // //   CheckCheck,
// // // // //   ShieldCheck,
// // // // //   Search,
// // // // //   MessageCircle,
// // // // // } from "lucide-react";

// // // // // const Messages = () => {
// // // // //   const [contacts, setContacts] = useState([]); // List for the sidebar
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [selectedUser, setSelectedUser] = useState(null);
// // // // //   const [activeListingId, setActiveListingId] = useState(null); // Track context
// // // // //   const [text, setText] = useState("");
// // // // //   const [activeTab, setActiveTab] = useState("users"); // 'users' or 'admins' for owners
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const scrollRef = useRef(null);
// // // // //   const prevMsgCount = useRef(0);

// // // // //   const currentUser = getUser();
// // // // //   const currentId = currentUser?.id || currentUser?._id;
// // // // //   const myRole = currentUser?.role; // 'user', 'owner', or 'admin'

// // // // //   // 1. Initial Data Fetch (Sidebar Contacts)
// // // // //   const fetchSidebarContacts = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       if (myRole === "owner") {
// // // // //         const [userRes, authRes] = await Promise.all([
// // // // //           getAllUsersAPI(),
// // // // //           getAllAuthsAPI(),
// // // // //         ]);
// // // // //         const users = userRes.auths || userRes.users || [];
// // // // //         const admins = (authRes.auths || authRes.data || []).filter(
// // // // //           (a) => a.role === "admin",
// // // // //         );

// // // // //         // If owner is on users tab, show users, else show admins
// // // // //         setContacts(activeTab === "users" ? users : admins);
// // // // //       } else if (myRole === "user") {
// // // // //         const ownerRes = await getAllOwnersAPI();
// // // // //         setContacts(ownerRes.auths || ownerRes.owners || []);
// // // // //       } else if (myRole === "admin") {
// // // // //         const ownerRes = await getAllOwnersAPI();
// // // // //         setContacts(ownerRes.auths || ownerRes.owners || []);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       toast.error("Failed to load contacts");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchSidebarContacts();
// // // // //   }, [currentId, activeTab]);

// // // // //   // 2. Chat History Polling
// // // // //   useEffect(() => {
// // // // //     let interval;
// // // // //     if (selectedUser) {
// // // // //       fetchChatHistory();
// // // // //       interval = setInterval(fetchChatHistory, 4000);
// // // // //     }
// // // // //     return () => {
// // // // //       clearInterval(interval);
// // // // //       prevMsgCount.current = 0;
// // // // //     };
// // // // //   }, [selectedUser]);

// // // // //   const fetchChatHistory = async () => {
// // // // //     if (!selectedUser) return;
// // // // //     try {
// // // // //       let res;
// // // // //       // Determine which specialized endpoint to use based on roles
// // // // //       if (myRole === "owner") {
// // // // //         if (selectedUser.role === "admin") {
// // // // //           res = await getChatByAdminOwnerAPI(selectedUser._id, currentId);
// // // // //         } else {
// // // // //           res = await getChatByUserOwnerAPI(selectedUser._id, currentId);
// // // // //         }
// // // // //       } else if (myRole === "user") {
// // // // //         res = await getChatByUserOwnerAPI(currentId, selectedUser._id);
// // // // //       } else if (myRole === "admin") {
// // // // //         res = await getChatByAdminOwnerAPI(currentId, selectedUser._id);
// // // // //       }

// // // // //       const newMessages = res?.data || [];

// // // // //       // Extract listingId from history if available to keep context
// // // // //       if (newMessages.length > 0 && !activeListingId) {
// // // // //         const lastWithListing = [...newMessages]
// // // // //           .reverse()
// // // // //           .find((m) => m.listingId);
// // // // //         if (lastWithListing)
// // // // //           setActiveListingId(
// // // // //             lastWithListing.listingId?._id || lastWithListing.listingId,
// // // // //           );
// // // // //       }

// // // // //       if (newMessages.length > prevMsgCount.current) {
// // // // //         setMessages(newMessages);
// // // // //         setTimeout(
// // // // //           () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
// // // // //           100,
// // // // //         );
// // // // //       } else {
// // // // //         setMessages(newMessages);
// // // // //       }
// // // // //       prevMsgCount.current = newMessages.length;
// // // // //     } catch (err) {
// // // // //       console.error("Chat history error", err);
// // // // //     }
// // // // //   };

// // // // //   // 3. Send Message
// // // // //   const handleSendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!text.trim() || !selectedUser) return;

// // // // //     try {
// // // // //       const payload = {
// // // // //         senderId: currentId,
// // // // //         receiverId: selectedUser._id,
// // // // //         listingId: activeListingId || null, // Important: Owner needs to know which business
// // // // //         message: text.trim(),
// // // // //       };

// // // // //       const res = await sendMessageAPI(payload);
// // // // //       if (res) {
// // // // //         setText("");
// // // // //         fetchChatHistory();
// // // // //       }
// // // // //     } catch (err) {
// // // // //       toast.error("Message not sent");
// // // // //     }
// // // // //   };

// // // // //   if (loading && contacts.length === 0)
// // // // //     return (
// // // // //       <div className="vh-100 d-flex align-items-center justify-content-center">
// // // // //         Loading Messages...
// // // // //       </div>
// // // // //     );

// // // // //   return (
// // // // //     <div className="container-fluid p-0 bg-light" style={{ height: "92vh" }}>
// // // // //       <div className="row g-0 h-100 shadow-sm overflow-hidden">
// // // // //         {/* --- SIDEBAR --- */}
// // // // //         <div className="col-md-4 col-lg-3 bg-white border-end d-flex flex-column">
// // // // //           <div className="p-3 bg-navy text-white d-flex align-items-center gap-3">
// // // // //             <img
// // // // //               src={getImgURL(currentUser.profileImage)}
// // // // //               className="rounded-circle border"
// // // // //               style={{ width: "40px", height: "40px", objectFit: "cover" }}
// // // // //               alt=""
// // // // //             />
// // // // //             <div className="overflow-hidden">
// // // // //               <p className="mb-0 fw-bold small text-truncate">
// // // // //                 {currentUser.fullName}
// // // // //               </p>
// // // // //               <small className="opacity-75" style={{ fontSize: "10px" }}>
// // // // //                 {currentUser.role?.toUpperCase()}
// // // // //               </small>
// // // // //             </div>
// // // // //           </div>

// // // // //           {myRole === "owner" && (
// // // // //             <div className="d-flex border-bottom">
// // // // //               <button
// // // // //                 className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "users" ? "text-success border-bottom border-2 border-success" : "text-muted bg-white"}`}
// // // // //                 onClick={() => setActiveTab("users")}>
// // // // //                 CLIENTS
// // // // //               </button>
// // // // //               <button
// // // // //                 className={`flex-grow-1 py-3 border-0 small fw-bold ${activeTab === "admins" ? "text-success border-bottom border-2 border-success" : "text-muted bg-white"}`}
// // // // //                 onClick={() => setActiveTab("admins")}>
// // // // //                 ADMIN SUPPORT
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="overflow-auto flex-grow-1">
// // // // //             {contacts.map((u) => (
// // // // //               <div
// // // // //                 key={u._id}
// // // // //                 onClick={() => {
// // // // //                   setSelectedUser(u);
// // // // //                   setMessages([]);
// // // // //                   setActiveListingId(null);
// // // // //                 }}
// // // // //                 className={`p-3 d-flex align-items-center border-bottom cursor-pointer hover-effect ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-success" : ""}`}>
// // // // //                 <img
// // // // //                   src={getImgURL(u.profileImage)}
// // // // //                   className="rounded-circle me-3 border"
// // // // //                   style={{ width: "45px", height: "45px", objectFit: "cover" }}
// // // // //                   onError={(e) =>
// // // // //                     (e.target.src =
// // // // //                       "https://cdn-icons-png.flaticon.com/512/149/149071.png")
// // // // //                   }
// // // // //                   alt=""
// // // // //                 />
// // // // //                 <div className="flex-grow-1 overflow-hidden">
// // // // //                   <h6 className="mb-0 fw-bold small text-truncate">
// // // // //                     {u.fullName}
// // // // //                   </h6>
// // // // //                   <small className="text-muted" style={{ fontSize: "10px" }}>
// // // // //                     {u.role}
// // // // //                   </small>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* --- CHAT WINDOW --- */}
// // // // //         <div className="col-md-8 col-lg-9 bg-white d-flex flex-column h-100">
// // // // //           {selectedUser ? (
// // // // //             <>
// // // // //               <div className="p-3 border-bottom d-flex align-items-center bg-light shadow-sm">
// // // // //                 <img
// // // // //                   src={getImgURL(selectedUser.profileImage)}
// // // // //                   className="rounded-circle me-3 border"
// // // // //                   style={{ width: "40px", height: "40px", objectFit: "cover" }}
// // // // //                   alt=""
// // // // //                 />
// // // // //                 <div className="flex-grow-1">
// // // // //                   <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>
// // // // //                   <small className="text-success" style={{ fontSize: "11px" }}>
// // // // //                     Active Chat
// // // // //                   </small>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-2 chat-bg">
// // // // //                 {messages.map((msg, i) => {
// // // // //                   const msgSenderId = msg.senderId?._id || msg.senderId;
// // // // //                   const isMe =
// // // // //                     msgSenderId?.toString() === currentId?.toString();
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={i}
// // // // //                       className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
// // // // //                       <div
// // // // //                         className={`p-2 px-3 shadow-sm ${isMe ? "bg-whatsapp-me rounded-me" : "bg-white rounded-other"}`}
// // // // //                         style={{ maxWidth: "75%" }}>
// // // // //                         {/* Show Listing context if this is the start of a business chat */}
// // // // //                         {msg.listingId?.title && (
// // // // //                           <div
// // // // //                             className="mb-1 p-1 bg-light rounded border-start border-3 border-success small fw-bold"
// // // // //                             style={{ fontSize: "11px" }}>
// // // // //                             Ref: {msg.listingId.title}
// // // // //                           </div>
// // // // //                         )}
// // // // //                         <div style={{ fontSize: "14px" }}>{msg.message}</div>
// // // // //                         <div
// // // // //                           className="d-flex align-items-center justify-content-end gap-1 mt-1 opacity-50"
// // // // //                           style={{ fontSize: "9px" }}>
// // // // //                           {new Date(msg.createdAt).toLocaleTimeString([], {
// // // // //                             hour: "2-digit",
// // // // //                             minute: "2-digit",
// // // // //                           })}
// // // // //                           {isMe && (
// // // // //                             <CheckCheck size={14} className="text-primary" />
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //                 <div ref={scrollRef} />
// // // // //               </div>

// // // // //               <div className="p-3 bg-light border-top">
// // // // //                 <form
// // // // //                   className="d-flex gap-2 align-items-center"
// // // // //                   onSubmit={handleSendMessage}>
// // // // //                   <input
// // // // //                     className="form-control rounded-pill border-0 px-4 py-2"
// // // // //                     value={text}
// // // // //                     onChange={(e) => setText(e.target.value)}
// // // // //                     placeholder="Type a message..."
// // // // //                   />
// // // // //                   <button
// // // // //                     type="submit"
// // // // //                     className="btn btn-success rounded-circle shadow p-0 d-flex align-items-center justify-content-center"
// // // // //                     style={{ width: "45px", height: "45px" }}>
// // // // //                     <Send size={18} color="white" />
// // // // //                   </button>
// // // // //                 </form>
// // // // //               </div>
// // // // //             </>
// // // // //           ) : (
// // // // //             <div className="m-auto text-center">
// // // // //               <div className="bg-light rounded-circle p-5 d-inline-block mb-3">
// // // // //                 <MessageCircle size={60} className="text-muted opacity-25" />
// // // // //               </div>
// // // // //               <h4 className="fw-bold">Your Messages</h4>
// // // // //               <p className="text-muted small">
// // // // //                 Select a contact from the list to view conversation history.
// // // // //               </p>
// // // // //               <div className="mt-5 text-muted small">
// // // // //                 <ShieldCheck size={14} /> End-to-end encryption
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       <style>{`
// // // // //         .bg-navy { background-color: #001f3f; }
// // // // //         .chat-bg {
// // // // //             backgroundColor: #e5ddd5;
// // // // //             background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
// // // // //         }
// // // // //         .bg-whatsapp-me { background-color: #dcf8c6; }
// // // // //         .rounded-me { border-radius: 10px 0px 10px 10px; }
// // // // //         .rounded-other { border-radius: 0px 10px 10px 10px; }
// // // // //         .hover-effect:hover { background-color: #f8f9fa; transition: 0.2s; }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Messages;

// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   getAllOwnersAPI,
// // // //   getAllUsersAPI,
// // // //   getAllAuthsAPI,
// // // //   // Your provided Chat APIs
// // // //   getChatHistoryAPI, // /chat/get-by-user-owner/:userId/:ownerId
// // // //   getChatAdminOwnerHistoryAPI, // /chat/get-by-admin-owner/:adminId/:ownerId
// // // //   sendMessageAPI, // /chat/send
// // // //   deleteChatMessageAPI, // /chat/delete/:id
// // // //   getImgURL,
// // // // } from "../services/authService";
// // // // import { getUser } from "../utils/storage";
// // // // import { toast } from "react-toastify";
// // // // import {
// // // //   Send,
// // // //   CheckCheck,
// // // //   ShieldCheck,
// // // //   MessageCircle,
// // // //   ArrowLeft,
// // // //   Trash2,
// // // //   User as UserIcon,
// // // // } from "lucide-react";

// // // // const Messages = () => {
// // // //   const [contacts, setContacts] = useState([]);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [selectedUser, setSelectedUser] = useState(null);
// // // //   const [activeListingId, setActiveListingId] = useState(null);
// // // //   const [text, setText] = useState("");
// // // //   const [activeTab, setActiveTab] = useState("users"); // 'users' or 'admins'
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [showChatMobile, setShowChatMobile] = useState(false);

// // // //   const currentUser = getUser();
// // // //   const currentId = currentUser?.id || currentUser?._id;
// // // //   const myRole = currentUser?.role;

// // // //   // 1. Fetch Sidebar Contacts based on Role
// // // //   const fetchSidebarContacts = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       if (myRole === "owner") {
// // // //         const [userRes, authRes] = await Promise.all([
// // // //           getAllUsersAPI(),
// // // //           getAllAuthsAPI(),
// // // //         ]);
// // // //         const users = userRes.auths || userRes.users || [];
// // // //         const admins = (authRes.auths || authRes.data || []).filter(
// // // //           (a) => a.role === "admin",
// // // //         );
// // // //         setContacts(activeTab === "users" ? users : admins);
// // // //       } else if (myRole === "user" || myRole === "admin") {
// // // //         const ownerRes = await getAllOwnersAPI();
// // // //         setContacts(ownerRes.auths || ownerRes.owners || []);
// // // //       }
// // // //     } catch (err) {
// // // //       toast.error("Failed to load contacts");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchSidebarContacts();
// // // //   }, [activeTab]);

// // // //   // 2. Chat History (No Automatic Scroll)
// // // //   useEffect(() => {
// // // //     let interval;
// // // //     if (selectedUser) {
// // // //       fetchChatHistory();
// // // //       interval = setInterval(fetchChatHistory, 5000); // Poll every 5s
// // // //     }
// // // //     return () => clearInterval(interval);
// // // //   }, [selectedUser]);

// // // //   const fetchChatHistory = async () => {
// // // //     if (!selectedUser) return;
// // // //     try {
// // // //       let res;
// // // //       // logic for choosing the correct API endpoint
// // // //       if (myRole === "owner") {
// // // //         if (selectedUser.role === "admin") {
// // // //           res = await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId);
// // // //         } else {
// // // //           res = await getChatHistoryAPI(selectedUser._id, currentId);
// // // //         }
// // // //       } else if (myRole === "user") {
// // // //         res = await getChatHistoryAPI(currentId, selectedUser._id);
// // // //       } else if (myRole === "admin") {
// // // //         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
// // // //       }

// // // //       const newMessages = res?.data || [];

// // // //       // Keep track of Listing ID context
// // // //       if (newMessages.length > 0 && !activeListingId) {
// // // //         const lastWithListing = [...newMessages]
// // // //           .reverse()
// // // //           .find((m) => m.listingId);
// // // //         if (lastWithListing)
// // // //           setActiveListingId(
// // // //             lastWithListing.listingId?._id || lastWithListing.listingId,
// // // //           );
// // // //       }
// // // //       setMessages(newMessages);
// // // //     } catch (err) {
// // // //       console.error("Chat Error", err);
// // // //     }
// // // //   };

// // // //   // 3. Delete Message Logic
// // // //   const handleDelete = async (msgId) => {
// // // //     if (!window.confirm("Delete this message?")) return;
// // // //     try {
// // // //       await deleteChatMessageAPI(msgId);
// // // //       toast.success("Message deleted");
// // // //       // Update UI immediately
// // // //       setMessages(messages.filter((m) => m._id !== msgId));
// // // //     } catch (err) {
// // // //       toast.error("Failed to delete");
// // // //     }
// // // //   };

// // // //   // 4. Send Message
// // // //   const handleSendMessage = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!text.trim() || !selectedUser) return;
// // // //     try {
// // // //       const payload = {
// // // //         senderId: currentId,
// // // //         receiverId: selectedUser._id,
// // // //         listingId: activeListingId || null,
// // // //         message: text.trim(),
// // // //       };
// // // //       const res = await sendMessageAPI(payload);
// // // //       if (res) {
// // // //         setText("");
// // // //         fetchChatHistory(); // Manual refresh
// // // //       }
// // // //     } catch (err) {
// // // //       toast.error("Message not sent");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="container-fluid bg-light py-md-4 py-0"
// // // //       style={{ height: "92vh" }}>
// // // //       <div className="row justify-content-center h-100">
// // // //         <div
// // // //           className="col-lg-11 col-xl-10 card shadow-lg border-0 rounded-4 overflow-hidden d-flex flex-row p-0"
// // // //           style={{ height: "85vh" }}>
// // // //           {/* SIDEBAR */}
// // // //           <div
// // // //             className={`col-12 col-md-4 col-lg-3 border-end bg-white flex-column ${showChatMobile ? "d-none d-md-flex" : "d-flex"}`}>
// // // //             <div className="p-3 border-bottom bg-white sticky-top">
// // // //               <div className="d-flex align-items-center gap-2 mb-3">
// // // //                 <div className="bg-primary p-2 rounded-circle text-white">
// // // //                   <UserIcon size={20} />
// // // //                 </div>
// // // //                 <h5 className="fw-bold mb-0">Messages</h5>
// // // //               </div>

// // // //               {myRole === "owner" && (
// // // //                 <div className="nav nav-pills nav-fill bg-light p-1 rounded-3">
// // // //                   <button
// // // //                     className={`nav-link small py-1 ${activeTab === "users" ? "active bg-dark" : "text-dark"}`}
// // // //                     onClick={() => setActiveTab("users")}>
// // // //                     Clients
// // // //                   </button>
// // // //                   <button
// // // //                     className={`nav-link small py-1 ${activeTab === "admins" ? "active bg-dark" : "text-dark"}`}
// // // //                     onClick={() => setActiveTab("admins")}>
// // // //                     Admin
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <div className="flex-grow-1 overflow-auto">
// // // //               {contacts.map((u) => (
// // // //                 <div
// // // //                   key={u._id}
// // // //                   onClick={() => {
// // // //                     setSelectedUser(u);
// // // //                     setShowChatMobile(true);
// // // //                   }}
// // // //                   className={`p-3 d-flex align-items-center gap-3 border-bottom cursor-pointer hover-bg ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-primary" : ""}`}>
// // // //                   <img
// // // //                     src={getImgURL(u.profileImage)}
// // // //                     className="rounded-circle border"
// // // //                     style={{
// // // //                       width: "45px",
// // // //                       height: "45px",
// // // //                       objectFit: "cover",
// // // //                     }}
// // // //                     alt=""
// // // //                   />
// // // //                   <div className="overflow-hidden">
// // // //                     <h6 className="mb-0 fw-bold small text-truncate">
// // // //                       {u.fullName}
// // // //                     </h6>
// // // //                     <small
// // // //                       className="text-muted text-uppercase"
// // // //                       style={{ fontSize: "9px" }}>
// // // //                       {u.role}
// // // //                     </small>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* CHAT AREA */}
// // // //           <div
// // // //             className={`col-12 col-md-8 col-lg-9 bg-white d-flex flex-column ${!showChatMobile ? "d-none d-md-flex" : "d-flex"}`}>
// // // //             {selectedUser ? (
// // // //               <>
// // // //                 {/* Chat Header */}
// // // //                 <div className="p-3 border-bottom bg-white d-flex align-items-center justify-content-between shadow-sm">
// // // //                   <div className="d-flex align-items-center gap-2">
// // // //                     <button
// // // //                       className="btn btn-sm d-md-none"
// // // //                       onClick={() => setShowChatMobile(false)}>
// // // //                       <ArrowLeft />
// // // //                     </button>
// // // //                     <img
// // // //                       src={getImgURL(selectedUser.profileImage)}
// // // //                       className="rounded-circle border"
// // // //                       style={{
// // // //                         width: "40px",
// // // //                         height: "40px",
// // // //                         objectFit: "cover",
// // // //                       }}
// // // //                       alt=""
// // // //                     />
// // // //                     <div>
// // // //                       <h6 className="mb-0 fw-bold">{selectedUser.fullName}</h6>
// // // //                       <small
// // // //                         className="text-success"
// // // //                         style={{ fontSize: "10px" }}>
// // // //                         ● Active Conversation
// // // //                       </small>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Messages Feed (No Auto Scroll) */}
// // // //                 <div className="flex-grow-1 overflow-auto p-3 p-md-4 bg-chat-pattern d-flex flex-column gap-3">
// // // //                   {messages.map((msg, i) => {
// // // //                     const isMe =
// // // //                       (msg.senderId?._id || msg.senderId) === currentId;
// // // //                     return (
// // // //                       <div
// // // //                         key={i}
// // // //                         className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
// // // //                         <div
// // // //                           className={`message-bubble p-2 px-3 shadow-sm rounded-3 position-relative ${isMe ? "bg-primary text-white" : "bg-light text-dark"}`}
// // // //                           style={{ minWidth: "120px", maxWidth: "80%" }}>
// // // //                           {/* Delete Icon on every message */}
// // // //                           <div className="d-flex justify-content-between align-items-start gap-3">
// // // //                             <div className="flex-grow-1">
// // // //                               {msg.listingId?.title && (
// // // //                                 <div
// // // //                                   className={`mb-1 pb-1 border-bottom small fw-bold ${isMe ? "border-white-50 text-white" : "border-secondary text-primary"}`}
// // // //                                   style={{ fontSize: "10px" }}>
// // // //                                   Ref: {msg.listingId.title}
// // // //                                 </div>
// // // //                               )}
// // // //                               <div style={{ fontSize: "14px" }}>
// // // //                                 {msg.message}
// // // //                               </div>
// // // //                             </div>
// // // //                             <Trash2
// // // //                               size={14}
// // // //                               className={`cursor-pointer mt-1 ${isMe ? "text-white-50" : "text-danger opacity-50"}`}
// // // //                               onClick={() => handleDelete(msg._id)}
// // // //                             />
// // // //                           </div>

// // // //                           <div
// // // //                             className="d-flex align-items-center justify-content-end gap-1 mt-1 opacity-50"
// // // //                             style={{ fontSize: "9px" }}>
// // // //                             {new Date(msg.createdAt).toLocaleTimeString([], {
// // // //                               hour: "2-digit",
// // // //                               minute: "2-digit",
// // // //                             })}
// // // //                             {isMe && <CheckCheck size={12} />}
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     );
// // // //                   })}
// // // //                 </div>

// // // //                 {/* Input */}
// // // //                 <div className="p-3 bg-white border-top">
// // // //                   <form
// // // //                     className="d-flex gap-2 mx-auto col-lg-10"
// // // //                     onSubmit={handleSendMessage}>
// // // //                     <input
// // // //                       className="form-control rounded-pill border-light bg-light px-4"
// // // //                       value={text}
// // // //                       onChange={(e) => setText(e.target.value)}
// // // //                       placeholder="Type a message..."
// // // //                       style={{ height: "45px" }}
// // // //                     />
// // // //                     <button
// // // //                       type="submit"
// // // //                       className="btn btn-primary rounded-circle p-0 shadow flex-shrink-0"
// // // //                       style={{ width: "45px", height: "45px" }}>
// // // //                       <Send size={18} />
// // // //                     </button>
// // // //                   </form>
// // // //                 </div>
// // // //               </>
// // // //             ) : (
// // // //               <div className="m-auto text-center px-4">
// // // //                 <div className="bg-light rounded-circle p-5 d-inline-block mb-3">
// // // //                   <MessageCircle size={60} className="text-muted opacity-25" />
// // // //                 </div>
// // // //                 <h4 className="fw-bold text-dark">Select a chat to start</h4>
// // // //                 <p className="text-muted small">
// // // //                   Choose from your clients or admin support on the left.
// // // //                 </p>
// // // //                 <div className="mt-4 badge bg-light text-muted p-2 border">
// // // //                   <ShieldCheck size={14} className="me-1 text-success" /> Secure
// // // //                   communication
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <style>{`
// // // //         .bg-chat-pattern {
// // // //           background-color: #f8f9fa;
// // // //           background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
// // // //         }
// // // //         .hover-bg:hover { background-color: #f1f3f4; transition: 0.2s; }
// // // //         .cursor-pointer { cursor: pointer; }
// // // //         @media (max-width: 768px) {
// // // //           .card { height: 95vh !important; border-radius: 0 !important; }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Messages;
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   getAllOwnersAPI,
// // //   getAllUsersAPI,
// // //   getAllAuthsAPI,
// // //   getChatHistoryAPI,
// // //   getChatAdminOwnerHistoryAPI,
// // //   sendMessageAPI,
// // //   deleteChatMessageAPI,
// // //   getImgURL,
// // // } from "../services/authService";
// // // import { getUser } from "../utils/storage";
// // // import { toast } from "react-toastify";
// // // import {
// // //   Send,
// // //   CheckCheck,
// // //   ShieldCheck,
// // //   MessageCircle,
// // //   ArrowLeft,
// // //   Trash2,
// // //   User as UserIcon,
// // //   Search,
// // //   Settings
// // // } from "lucide-react";

// // // const Messages = () => {
// // //   const [contacts, setContacts] = useState([]);
// // //   const [messages, setMessages] = useState([]);
// // //   const [selectedUser, setSelectedUser] = useState(null);
// // //   const [activeListingId, setActiveListingId] = useState(null);
// // //   const [text, setText] = useState("");
// // //   const [activeTab, setActiveTab] = useState("users");
// // //   const [loading, setLoading] = useState(true);
// // //   const [showChatMobile, setShowChatMobile] = useState(false);

// // //   const currentUser = getUser();
// // //   const currentId = currentUser?.id || currentUser?._id;
// // //   const myRole = currentUser?.role;

// // //   const fetchSidebarContacts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       if (myRole === "owner") {
// // //         const [userRes, authRes] = await Promise.all([
// // //           getAllUsersAPI(),
// // //           getAllAuthsAPI(),
// // //         ]);
// // //         const users = userRes.auths || userRes.users || [];
// // //         const admins = (authRes.auths || authRes.data || []).filter(a => a.role === "admin");
// // //         setContacts(activeTab === "users" ? users : admins);
// // //       } else {
// // //         const ownerRes = await getAllOwnersAPI();
// // //         setContacts(ownerRes.auths || ownerRes.owners || []);
// // //       }
// // //     } catch (err) {
// // //       toast.error("Failed to load contacts");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchSidebarContacts();
// // //   }, [activeTab]);

// // //   useEffect(() => {
// // //     let interval;
// // //     if (selectedUser) {
// // //       fetchChatHistory();
// // //       interval = setInterval(fetchChatHistory, 5000);
// // //     }
// // //     return () => clearInterval(interval);
// // //   }, [selectedUser]);

// // //   const fetchChatHistory = async () => {
// // //     if (!selectedUser) return;
// // //     try {
// // //       let res;
// // //       if (myRole === "owner") {
// // //         res = selectedUser.role === "admin"
// // //           ? await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId)
// // //           : await getChatHistoryAPI(selectedUser._id, currentId);
// // //       } else if (myRole === "user") {
// // //         res = await getChatHistoryAPI(currentId, selectedUser._id);
// // //       } else {
// // //         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
// // //       }

// // //       const newMessages = res?.data || [];
// // //       if (newMessages.length > 0 && !activeListingId) {
// // //         const lastWithListing = [...newMessages].reverse().find(m => m.listingId);
// // //         if (lastWithListing) setActiveListingId(lastWithListing.listingId?._id || lastWithListing.listingId);
// // //       }
// // //       setMessages(newMessages);
// // //     } catch (err) {
// // //       console.error("Chat Error", err);
// // //     }
// // //   };

// // //   const handleDelete = async (msgId) => {
// // //     if (!window.confirm("Delete this message?")) return;
// // //     try {
// // //       await deleteChatMessageAPI(msgId);
// // //       setMessages(messages.filter(m => m._id !== msgId));
// // //       toast.success("Deleted");
// // //     } catch (err) {
// // //       toast.error("Failed to delete");
// // //     }
// // //   };

// // //   const handleSendMessage = async (e) => {
// // //     e.preventDefault();
// // //     if (!text.trim() || !selectedUser) return;
// // //     try {
// // //       const payload = {
// // //         senderId: currentId,
// // //         receiverId: selectedUser._id,
// // //         listingId: activeListingId || null,
// // //         message: text.trim(),
// // //       };
// // //       const res = await sendMessageAPI(payload);
// // //       if (res) {
// // //         setText("");
// // //         fetchChatHistory();
// // //       }
// // //     } catch (err) {
// // //       toast.error("Error sending");
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid bg-soft-gray vh-100 py-3">
// // //       <div className="row justify-content-center h-100">
// // //         <div className="col-12 col-xl-10 shadow-lg rounded-4 overflow-hidden bg-white d-flex p-0 box-shadow-custom" style={{ height: "90vh" }}>

// // //           {/* --- SIDEBAR --- */}
// // //           <div className={`col-12 col-md-4 col-lg-3 border-end d-flex flex-column bg-white ${showChatMobile ? 'd-none d-md-flex' : 'd-flex'}`}>

// // //             {/* Header: Owner/User Profile */}
// // //             <div className="p-3 bg-navy text-white d-flex align-items-center justify-content-between">
// // //               <div className="d-flex align-items-center gap-2">
// // //                 <img
// // //                   src={getImgURL(currentUser?.profileImage)}
// // //                   className="rounded-circle border border-2 border-light shadow-sm"
// // //                   style={{ width: "45px", height: "45px", objectFit: "cover" }}
// // //                   alt="My Profile"
// // //                 />
// // //                 <div className="overflow-hidden">
// // //                   <h6 className="mb-0 small fw-bold text-truncate">{currentUser?.fullName}</h6>
// // //                   <span className="badge bg-light text-dark text-uppercase mt-1" style={{ fontSize: '8px' }}>{myRole}</span>
// // //                 </div>
// // //               </div>
// // //               <Settings size={18} className="opacity-75 cursor-pointer" />
// // //             </div>

// // //             {/* Tabs for Owner */}
// // //             {myRole === "owner" && (
// // //               <div className="d-flex p-2 gap-2 bg-light border-bottom">
// // //                 <button onClick={() => setActiveTab("users")} className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-secondary'}`}>Clients</button>
// // //                 <button onClick={() => setActiveTab("admins")} className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === 'admins' ? 'btn-primary' : 'btn-outline-secondary'}`}>Admins</button>
// // //               </div>
// // //             )}

// // //             {/* Contact List */}
// // //             <div className="flex-grow-1 overflow-auto bg-white custom-scrollbar">
// // //               {contacts.map((u) => (
// // //                 <div
// // //                   key={u._id}
// // //                   onClick={() => { setSelectedUser(u); setShowChatMobile(true); }}
// // //                   className={`p-3 d-flex align-items-center gap-3 border-bottom cursor-pointer transition-all ${selectedUser?._id === u._id ? "bg-selected border-start border-4 border-primary" : "hover-bg-light"}`}
// // //                 >
// // //                   <img src={getImgURL(u.profileImage)} className="rounded-circle shadow-sm border" style={{ width: "48px", height: "48px", objectFit: "cover" }} alt="" />
// // //                   <div className="overflow-hidden flex-grow-1">
// // //                     <div className="d-flex justify-content-between">
// // //                       <h6 className="mb-0 small fw-bold text-dark text-truncate">{u.fullName}</h6>
// // //                     </div>
// // //                     <small className="text-muted text-uppercase" style={{ fontSize: '9px' }}>{u.role}</small>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* --- CHAT VIEW --- */}
// // //           <div className={`col-12 col-md-8 col-lg-9 d-flex flex-column bg-chat-window ${!showChatMobile ? 'd-none d-md-flex' : 'd-flex'}`}>
// // //             {selectedUser ? (
// // //               <>
// // //                 {/* Header */}
// // //                 <div className="p-3 bg-white border-bottom shadow-sm d-flex align-items-center justify-content-between sticky-top">
// // //                   <div className="d-flex align-items-center gap-3">
// // //                     <button className="btn btn-light btn-sm d-md-none rounded-circle" onClick={() => setShowChatMobile(false)}><ArrowLeft size={18}/></button>
// // //                     <img src={getImgURL(selectedUser.profileImage)} className="rounded-circle border" style={{ width: "42px", height: "42px", objectFit: "cover" }} alt="" />
// // //                     <div>
// // //                       <h6 className="mb-0 fw-bold text-dark">{selectedUser.fullName}</h6>
// // //                       <div className="d-flex align-items-center gap-1">
// // //                         <span className="dot bg-success"></span>
// // //                         <small className="text-muted" style={{fontSize: '11px'}}>Online</small>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Message Feed (MANUAL SCROLL ONLY) */}
// // //                 <div className="flex-grow-1 overflow-auto p-3 p-md-4 d-flex flex-column gap-3 custom-scrollbar">
// // //                   {messages.map((msg, i) => {
// // //                     const isMe = (msg.senderId?._id || msg.senderId) === currentId;
// // //                     return (
// // //                       <div key={i} className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
// // //                         <div className={`message-card p-2 px-3 shadow-sm ${isMe ? "bg-primary text-white msg-me" : "bg-white text-dark msg-other"}`} style={{ maxWidth: "75%", minWidth: "120px" }}>

// // //                           <div className="d-flex justify-content-between gap-3">
// // //                             <div className="flex-grow-1">
// // //                               {msg.listingId?.title && (
// // //                                 <div className={`listing-label mb-1 fw-bold ${isMe ? 'text-white-50' : 'text-primary'}`} style={{fontSize: '10px'}}>
// // //                                   Ref: {msg.listingId.title}
// // //                                 </div>
// // //                               )}
// // //                               <div className="message-content">{msg.message}</div>
// // //                             </div>
// // //                             <Trash2 size={14} className={`cursor-pointer mt-1 ${isMe ? 'text-white-50 opacity-hover' : 'text-danger opacity-50'}`} onClick={() => handleDelete(msg._id)} />
// // //                           </div>

// // //                           <div className={`d-flex align-items-center justify-content-end gap-1 mt-1 opacity-75`} style={{ fontSize: "10px" }}>
// // //                             {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// // //                             {isMe && <CheckCheck size={14} />}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>

// // //                 {/* Input Area */}
// // //                 <div className="p-3 bg-white border-top">
// // //                   <form className="d-flex gap-2 mx-auto col-lg-10 col-xl-8" onSubmit={handleSendMessage}>
// // //                     <input className="form-control rounded-pill border-0 bg-light px-4 py-2 shadow-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your message..." style={{ height: "46px" }} />
// // //                     <button type="submit" className="btn btn-primary rounded-circle shadow p-0 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: "46px", height: "46px" }}>
// // //                       <Send size={20} />
// // //                     </button>
// // //                   </form>
// // //                 </div>
// // //               </>
// // //             ) : (
// // //               <div className="m-auto text-center px-4">
// // //                 <div className="bg-light rounded-circle p-5 d-inline-block mb-3 shadow-sm border">
// // //                   <MessageCircle size={70} className="text-primary opacity-25" />
// // //                 </div>
// // //                 <h4 className="fw-bold text-dark">Messenger</h4>
// // //                 <p className="text-muted mx-auto" style={{ maxWidth: '300px' }}>Select a contact from the left menu to view your conversation history.</p>
// // //                 <div className="badge bg-soft-primary text-primary px-3 py-2 mt-4 rounded-pill">
// // //                   <ShieldCheck size={14} className="me-1" /> End-to-end encrypted
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .bg-soft-gray { background-color: #f0f2f5; }
// // //         .bg-navy { background-color: #001f3f; }
// // //         .bg-chat-window { background-color: #f7f9fb; }
// // //         .bg-selected { background-color: #eef2ff !important; }
// // //         .hover-bg-light:hover { background-color: #f8f9fa; }
// // //         .bg-soft-primary { background-color: #e0e7ff; }
// // //         .text-primary { color: #4f46e5 !important; }
// // //         .btn-primary { background-color: #4f46e5; border: none; }
// // //         .btn-primary:hover { background-color: #4338ca; }

// // //         .message-card {
// // //           border-radius: 18px;
// // //           border: none;
// // //           position: relative;
// // //         }
// // //         .msg-me { border-bottom-right-radius: 4px; }
// // //         .msg-other { border-bottom-left-radius: 4px; }

// // //         .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
// // //         .listing-label { border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 2px; }
// // //         .opacity-hover:hover { opacity: 1 !important; color: white !important; }

// // //         .custom-scrollbar::-webkit-scrollbar { width: 5px; }
// // //         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
// // //         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

// // //         .box-shadow-custom { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
// // //         .transition-all { transition: all 0.2s ease-in-out; }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Messages;

// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   getAllOwnersAPI,
// //   getAllUsersAPI,
// //   getAllAuthsAPI,
// //   getChatHistoryAPI,
// //   getChatAdminOwnerHistoryAPI,
// //   sendMessageAPI,
// //   deleteChatMessageAPI,
// //   getImgURL,
// // } from "../services/authService";
// // import { getUser } from "../utils/storage";
// // import { toast } from "react-toastify";
// // import {
// //   Send,
// //   CheckCheck,
// //   ArrowLeft,
// //   Trash2,
// //   Search,
// //   MoreVertical,
// //   Paperclip,
// //   Smile,
// // } from "lucide-react";

// // const Messages = () => {
// //   const [contacts, setContacts] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [activeListingId, setActiveListingId] = useState(null);
// //   const [text, setText] = useState("");
// //   const [activeTab, setActiveTab] = useState("users");
// //   const [loading, setLoading] = useState(true);
// //   const [showChatMobile, setShowChatMobile] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const scrollRef = useRef(null); // Container scroll ke liye
// //   const currentUser = getUser();
// //   const currentId = currentUser?.id || currentUser?._id;
// //   const myRole = currentUser?.role;

// //   // --- PERFECT SCROLL TO BOTTOM LOGIC ---
// //   useEffect(() => {
// //     if (scrollRef.current) {
// //       // Isse sirf div ke andar scroll hoga, poora page nahi hilega
// //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const fetchSidebarContacts = async () => {
// //     try {
// //       setLoading(true);
// //       if (myRole === "owner") {
// //         const [userRes, authRes] = await Promise.all([
// //           getAllUsersAPI(),
// //           getAllAuthsAPI(),
// //         ]);
// //         const users = userRes.auths || userRes.users || [];
// //         const admins = (authRes.auths || authRes.data || []).filter(
// //           (a) => a.role === "admin",
// //         );
// //         setContacts(activeTab === "users" ? users : admins);
// //       } else {
// //         const ownerRes = await getAllOwnersAPI();
// //         setContacts(ownerRes.auths || ownerRes.owners || []);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load contacts");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSidebarContacts();
// //   }, [activeTab]);

// //   useEffect(() => {
// //     let interval;
// //     if (selectedUser) {
// //       fetchChatHistory();
// //       interval = setInterval(fetchChatHistory, 5000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [selectedUser]);

// //   const fetchChatHistory = async () => {
// //     if (!selectedUser) return;
// //     try {
// //       let res;
// //       if (myRole === "owner") {
// //         res =
// //           selectedUser.role === "admin"
// //             ? await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId)
// //             : await getChatHistoryAPI(selectedUser._id, currentId);
// //       } else if (myRole === "user") {
// //         res = await getChatHistoryAPI(currentId, selectedUser._id);
// //       } else {
// //         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
// //       }

// //       const newMessages = res?.data || [];
// //       if (newMessages.length > 0 && !activeListingId) {
// //         const lastWithListing = [...newMessages]
// //           .reverse()
// //           .find((m) => m.listingId);
// //         if (lastWithListing)
// //           setActiveListingId(
// //             lastWithListing.listingId?._id || lastWithListing.listingId,
// //           );
// //       }
// //       setMessages(newMessages);
// //     } catch (err) {
// //       console.error("Chat Error", err);
// //     }
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim() || !selectedUser) return;
// //     try {
// //       const payload = {
// //         senderId: currentId,
// //         receiverId: selectedUser._id,
// //         listingId: activeListingId || null,
// //         message: text.trim(),
// //       };
// //       const res = await sendMessageAPI(payload);
// //       if (res) {
// //         setText("");
// //         fetchChatHistory();
// //       }
// //     } catch (err) {
// //       toast.error("Error sending");
// //     }
// //   };

// //   const filteredContacts = contacts.filter((c) =>
// //     c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
// //   );

// //   return (
// //     <div className="container-fluid py-2 py-md-4" style={{ height: "92vh" }}>
// //       <div
// //         className="row g-0 h-100 shadow border rounded-3 overflow-hidden bg-white mx-auto"
// //         style={{ maxWidth: "1250px" }}>
// //         {/* --- SIDEBAR --- */}
// //         <div
// //           className={`col-md-4 col-lg-3 d-flex flex-column border-end bg-white h-100 ${showChatMobile ? "d-none d-md-flex" : "d-flex"}`}>
// //           <div
// //             className="p-3 bg-light d-flex align-items-center justify-content-between border-bottom"
// //             style={{ height: "65px" }}>
// //             <img
// //               src={getImgURL(currentUser?.profileImage)}
// //               className="rounded-circle border"
// //               width="40"
// //               height="40"
// //               style={{ objectFit: "cover" }}
// //               alt="me"
// //             />
// //             {/* <div className="d-flex gap-3 text-secondary">
// //               <Smile size={20} className="cursor-pointer" />
// //               <MoreVertical size={20} className="cursor-pointer" />
// //             </div> */}
// //           </div>

// //           <div className="p-2 border-bottom shadow-sm">
// //             <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
// //               <Search size={16} className="text-muted" />
// //               <input
// //                 type="text"
// //                 className="form-control border-0 bg-transparent shadow-none"
// //                 placeholder="Search chats"
// //                 style={{ fontSize: "14px" }}
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <div className="flex-grow-1 overflow-auto custom-scroll">
// //             {filteredContacts.map((u) => (
// //               <div
// //                 key={u._id}
// //                 onClick={() => {
// //                   setSelectedUser(u);
// //                   setShowChatMobile(true);
// //                 }}
// //                 className={`d-flex align-items-center p-3 border-bottom cursor-pointer ${selectedUser?._id === u._id ? "bg-light" : ""}`}>
// //                 <img
// //                   src={getImgURL(u.profileImage)}
// //                   className="rounded-circle me-3 border"
// //                   width="45"
// //                   height="45"
// //                   style={{ objectFit: "cover" }}
// //                   alt=""
// //                 />
// //                 <div className="flex-grow-1 overflow-hidden">
// //                   <div className="d-flex justify-content-between align-items-center">
// //                     <h6
// //                       className="mb-0 text-truncate fw-bold"
// //                       style={{ fontSize: "15px" }}>
// //                       {u.fullName}
// //                     </h6>
// //                     <small className="text-muted" style={{ fontSize: "10px" }}>
// //                       {u.role}
// //                     </small>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* --- CHAT VIEW --- */}
// //         <div
// //           className={`col-md-8 col-lg-9 d-flex flex-column h-100 ${!showChatMobile ? "d-none d-md-flex" : "d-flex"}`}
// //           style={{ backgroundColor: "#efeae2" }}>
// //           {selectedUser ? (
// //             <>
// //               {/* Header */}
// //               <div
// //                 className="p-2 px-3 bg-light border-bottom d-flex align-items-center justify-content-between shadow-sm"
// //                 style={{ height: "65px", flexShrink: 0 }}>
// //                 <div className="d-flex align-items-center">
// //                   <button
// //                     className="btn d-md-none p-0 me-2"
// //                     onClick={() => setShowChatMobile(false)}>
// //                     <ArrowLeft size={22} />
// //                   </button>
// //                   <img
// //                     src={getImgURL(selectedUser.profileImage)}
// //                     className="rounded-circle border"
// //                     width="40"
// //                     height="40"
// //                     style={{ objectFit: "cover" }}
// //                     alt=""
// //                   />
// //                   <div className="ms-3">
// //                     <h6 className="mb-0 fw-bold" style={{ fontSize: "15px" }}>
// //                       {selectedUser.fullName}
// //                     </h6>
// //                     <small
// //                       className="text-success fw-bold"
// //                       style={{ fontSize: "11px" }}>
// //                       online
// //                     </small>
// //                   </div>
// //                 </div>
// //                 {/* <MoreVertical size={20} className="text-muted cursor-pointer" /> */}
// //               </div>

// //               {/* Messages Area (SCROLLABLE) */}
// //               <div
// //                 ref={scrollRef}
// //                 className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2"
// //                 style={{
// //                   backgroundImage:
// //                     "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
// //                   backgroundSize: "contain",
// //                   scrollBehavior: "smooth",
// //                 }}>
// //                 {messages.map((msg, i) => {
// //                   const isMe =
// //                     (msg.senderId?._id || msg.senderId) === currentId;
// //                   return (
// //                     <div
// //                       key={i}
// //                       className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
// //                       <div
// //                         className={`p-2 px-3 rounded-3 shadow-sm ${isMe ? "bg-success text-white" : "bg-white text-dark"}`}
// //                         style={{ maxWidth: "75%", fontSize: "14px" }}>
// //                         {/* Listing Title Display */}
// //                         {msg.listingId?.title && (
// //                           <div
// //                             className="mb-1 border-start border-3 border-info ps-2 bg-black bg-opacity-10 rounded small py-1"
// //                             style={{ fontSize: "11px" }}>
// //                             <strong>Ref:</strong> {msg.listingId.title}
// //                           </div>
// //                         )}
// //                         <div>{msg.message}</div>
// //                         <div
// //                           className={`text-end mt-1 ${isMe ? "text-white-50" : "text-muted"}`}
// //                           style={{ fontSize: "10px" }}>
// //                           {new Date(msg.createdAt).toLocaleTimeString([], {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           })}
// //                           {isMe && <CheckCheck size={14} className="ms-1" />}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               {/* Input Footer */}
// //               <div
// //                 className="p-3 bg-light border-top d-flex align-items-center"
// //                 style={{ flexShrink: 0 }}>
// //                 {/* <div className="d-flex gap-3 text-muted me-3">
// //                   <Smile size={24} className="cursor-pointer" />
// //                   <Paperclip size={24} className="cursor-pointer" />
// //                 </div> */}
// //                 <form
// //                   className="flex-grow-1 d-flex gap-2"
// //                   onSubmit={handleSendMessage}>
// //                   <input
// //                     type="text"
// //                     className="form-control border-0 rounded-pill px-4 shadow-none"
// //                     placeholder="Type a message"
// //                     style={{ height: "45px", fontSize: "15px" }}
// //                     value={text}
// //                     onChange={(e) => setText(e.target.value)}
// //                   />
// //                   <button
// //                     type="submit"
// //                     className="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-0"
// //                     style={{ width: "45px", height: "45px" }}
// //                     disabled={!text.trim()}>
// //                     <Send size={20} />
// //                   </button>
// //                 </form>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="m-auto text-center px-4">
// //               <img
// //                 src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669ae5z23.png"
// //                 alt="wa"
// //                 width="300"
// //                 className="opacity-50 mb-4"
// //               />
// //               <h3 className="text-secondary fw-light">WhatsApp Web</h3>
// //               <p className="text-muted small">
// //                 Select a conversation to start chatting.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar { width: 5px; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 10px; }
// //         .cursor-pointer { cursor: pointer; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Messages;

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
// import {
//   Send,
//   CheckCheck,
//   ArrowLeft,
//   Trash2,
//   Search,
//   Settings,
//   ShieldCheck,
// } from "lucide-react";

// const Messages = () => {
//   const [contacts, setContacts] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeListingId, setActiveListingId] = useState(null);
//   const [text, setText] = useState("");
//   const [activeTab, setActiveTab] = useState("users"); // Switch between 'users' and 'admins'
//   const [loading, setLoading] = useState(true);
//   const [showChatMobile, setShowChatMobile] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const scrollRef = useRef(null);
//   const currentUser = getUser();
//   const currentId = currentUser?.id || currentUser?._id;
//   const myRole = currentUser?.role;

//   // --- PERFECT SCROLL TO BOTTOM LOGIC ---
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const fetchSidebarContacts = async () => {
//     try {
//       setLoading(true);
//       if (myRole === "owner") {
//         // Fetch both Users and All Auths (to filter Admins)
//         const [userRes, authRes] = await Promise.all([
//           getAllUsersAPI(),
//           getAllAuthsAPI(),
//         ]);
//         const users = userRes.auths || userRes.users || [];
//         const admins = (authRes.auths || authRes.data || []).filter(
//           (a) => a.role === "admin",
//         );

//         // Show contacts based on active tab
//         setContacts(activeTab === "users" ? users : admins);
//       } else {
//         // Users see Owners
//         const ownerRes = await getAllOwnersAPI();
//         setContacts(ownerRes.auths || ownerRes.owners || []);
//       }
//     } catch (err) {
//       toast.error("Failed to load contacts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSidebarContacts();
//   }, [activeTab]);

//   useEffect(() => {
//     let interval;
//     if (selectedUser) {
//       fetchChatHistory();
//       interval = setInterval(fetchChatHistory, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [selectedUser]);

//   const fetchChatHistory = async () => {
//     if (!selectedUser) return;
//     try {
//       let res;
//       if (myRole === "owner") {
//         // If owner is talking to admin, use admin-owner API, else standard history
//         res =
//           selectedUser.role === "admin"
//             ? await getChatAdminOwnerHistoryAPI(selectedUser._id, currentId)
//             : await getChatHistoryAPI(selectedUser._id, currentId);
//       } else if (myRole === "user") {
//         res = await getChatHistoryAPI(currentId, selectedUser._id);
//       } else {
//         // Admin talking to owner
//         res = await getChatAdminOwnerHistoryAPI(currentId, selectedUser._id);
//       }

//       const newMessages = res?.data || [];
//       if (newMessages.length > 0 && !activeListingId) {
//         const lastWithListing = [...newMessages]
//           .reverse()
//           .find((m) => m.listingId);
//         if (lastWithListing)
//           setActiveListingId(
//             lastWithListing.listingId?._id || lastWithListing.listingId,
//           );
//       }
//       setMessages(newMessages);
//     } catch (err) {
//       console.error("Chat Error", err);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() || !selectedUser) return;
//     try {
//       const payload = {
//         senderId: currentId,
//         receiverId: selectedUser._id,
//         listingId: activeListingId || null,
//         message: text.trim(),
//       };
//       const res = await sendMessageAPI(payload);
//       if (res) {
//         setText("");
//         fetchChatHistory();
//       }
//     } catch (err) {
//       toast.error("Error sending");
//     }
//   };

//   const filteredContacts = contacts.filter((c) =>
//     c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="container-fluid py-2 py-md-4" style={{ height: "92vh" }}>
//       <div
//         className="row g-0 h-100 shadow border rounded-3 overflow-hidden bg-white mx-auto"
//         style={{ maxWidth: "1250px" }}>
//         {/* --- SIDEBAR --- */}
//         <div
//           className={`col-md-4 col-lg-3 d-flex flex-column border-end bg-white h-100 ${showChatMobile ? "d-none d-md-flex" : "d-flex"}`}>
//           {/* Owner Profile Header */}
//           <div
//             className="p-3 bg-navy text-white d-flex align-items-center justify-content-between"
//             style={{ height: "75px" }}>
//             <div className="d-flex align-items-center gap-2 overflow-hidden">
//               <img
//                 src={getImgURL(currentUser?.profileImage)}
//                 className="rounded-circle border border-2 border-light shadow-sm"
//                 width="45"
//                 height="45"
//                 style={{ objectFit: "cover" }}
//                 alt="me"
//               />
//               <div className="overflow-hidden">
//                 <h6 className="mb-0 small fw-bold text-truncate">
//                   {currentUser?.fullName}
//                 </h6>
//                 <small
//                   className="opacity-75 text-uppercase"
//                   style={{ fontSize: "9px" }}>
//                   {myRole}
//                 </small>
//               </div>
//             </div>
//             <Settings size={18} className="opacity-50 cursor-pointer" />
//           </div>

//           {/* Admin/Client Tabs for Owner */}
//           {myRole === "owner" && (
//             <div className="d-flex bg-light border-bottom p-1">
//               <button
//                 className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === "users" ? "btn-success shadow-sm" : "text-muted"}`}
//                 onClick={() => {
//                   setActiveTab("users");
//                   setSelectedUser(null);
//                 }}>
//                 CLIENTS
//               </button>
//               <button
//                 className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === "admins" ? "btn-success shadow-sm" : "text-muted"}`}
//                 onClick={() => {
//                   setActiveTab("admins");
//                   setSelectedUser(null);
//                 }}>
//                 ADMIN
//               </button>
//             </div>
//           )}

//           <div className="p-2 border-bottom shadow-sm">
//             <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
//               <Search size={16} className="text-muted" />
//               <input
//                 type="text"
//                 className="form-control border-0 bg-transparent shadow-none"
//                 placeholder="Search chats"
//                 style={{ fontSize: "14px" }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex-grow-1 overflow-auto custom-scroll">
//             {filteredContacts.map((u) => (
//               <div
//                 key={u._id}
//                 onClick={() => {
//                   setSelectedUser(u);
//                   setShowChatMobile(true);
//                 }}
//                 className={`d-flex align-items-center p-3 border-bottom cursor-pointer ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-success" : ""}`}>
//                 <img
//                   src={getImgURL(u.profileImage)}
//                   className="rounded-circle me-3 border"
//                   width="45"
//                   height="45"
//                   style={{ objectFit: "cover" }}
//                   onError={(e) =>
//                     (e.target.src =
//                       "https://cdn-icons-png.flaticon.com/512/149/149071.png")
//                   }
//                   alt=""
//                 />
//                 <div className="flex-grow-1 overflow-hidden">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <h6
//                       className="mb-0 text-truncate fw-bold"
//                       style={{ fontSize: "15px" }}>
//                       {u.fullName}
//                     </h6>
//                     <small
//                       className="text-muted text-uppercase"
//                       style={{ fontSize: "9px" }}>
//                       {u.role}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- CHAT VIEW --- */}
//         <div
//           className={`col-md-8 col-lg-9 d-flex flex-column h-100 ${!showChatMobile ? "d-none d-md-flex" : "d-flex"}`}
//           style={{ backgroundColor: "#efeae2" }}>
//           {selectedUser ? (
//             <>
//               {/* Header */}
//               <div
//                 className="p-2 px-3 bg-light border-bottom d-flex align-items-center justify-content-between shadow-sm"
//                 style={{ height: "65px", flexShrink: 0 }}>
//                 <div className="d-flex align-items-center">
//                   <button
//                     className="btn d-md-none p-0 me-2"
//                     onClick={() => setShowChatMobile(false)}>
//                     <ArrowLeft size={22} />
//                   </button>
//                   <img
//                     src={getImgURL(selectedUser.profileImage)}
//                     className="rounded-circle border"
//                     width="40"
//                     height="40"
//                     style={{ objectFit: "cover" }}
//                     onError={(e) =>
//                       (e.target.src =
//                         "https://cdn-icons-png.flaticon.com/512/149/149071.png")
//                     }
//                     alt=""
//                   />
//                   <div className="ms-3">
//                     <h6 className="mb-0 fw-bold" style={{ fontSize: "15px" }}>
//                       {selectedUser.fullName}
//                     </h6>
//                     <small
//                       className="text-success fw-bold"
//                       style={{ fontSize: "11px" }}>
//                       online
//                     </small>
//                   </div>
//                 </div>
//               </div>

//               {/* Messages Area */}
//               <div
//                 ref={scrollRef}
//                 className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2"
//                 style={{
//                   backgroundImage:
//                     "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
//                   backgroundSize: "contain",
//                   scrollBehavior: "smooth",
//                 }}>
//                 {messages.map((msg, i) => {
//                   const isMe =
//                     (msg.senderId?._id || msg.senderId) === currentId;
//                   return (
//                     <div
//                       key={i}
//                       className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
//                       <div
//                         className={`p-2 px-3 rounded-3 shadow-sm ${isMe ? "bg-success text-white" : "bg-white text-dark"}`}
//                         style={{ maxWidth: "75%", fontSize: "14px" }}>
//                         {msg.listingId?.title && (
//                           <div
//                             className="mb-1 border-start border-3 border-info ps-2 bg-black bg-opacity-10 rounded small py-1"
//                             style={{ fontSize: "11px" }}>
//                             <strong>Ref:</strong> {msg.listingId.title}
//                           </div>
//                         )}
//                         <div>{msg.message}</div>
//                         <div
//                           className={`text-end mt-1 ${isMe ? "text-white-50" : "text-muted"}`}
//                           style={{ fontSize: "10px" }}>
//                           {new Date(msg.createdAt).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                           {isMe && <CheckCheck size={14} className="ms-1" />}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Input Footer */}
//               <div
//                 className="p-3 bg-light border-top d-flex align-items-center"
//                 style={{ flexShrink: 0 }}>
//                 <form
//                   className="flex-grow-1 d-flex gap-2"
//                   onSubmit={handleSendMessage}>
//                   <input
//                     type="text"
//                     className="form-control border-0 rounded-pill px-4 shadow-none"
//                     placeholder="Type a message"
//                     style={{ height: "45px", fontSize: "15px" }}
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                   />
//                   <button
//                     type="submit"
//                     className="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-0"
//                     style={{ width: "45px", height: "45px" }}
//                     disabled={!text.trim()}>
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </>
//           ) : (
//             <div className="m-auto text-center px-4">
//               <div className="bg-light rounded-circle p-5 d-inline-block mb-3 shadow-sm border">
//                 <ShieldCheck size={70} className="text-success opacity-25" />
//               </div>
//               <h3 className="text-secondary fw-light">Select a Chat</h3>
//               <p className="text-muted small">
//                 Choose a client or Admin to start messaging.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//       <style>{`
//         .bg-navy { background-color: #001f3f; }
//         .custom-scroll::-webkit-scrollbar { width: 5px; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 10px; }
//         .cursor-pointer { cursor: pointer; }
//       `}</style>
//     </div>
//   );
// };

// export default Messages;
import React, { useState, useEffect, useRef } from "react";
import {
  getAllOwnersAPI,
  getAllUsersAPI,
  getAllAuthsAPI,
  getChatHistoryAPI,
  getChatAdminOwnerHistoryAPI,
  sendMessageAPI,
  deleteChatMessageAPI,
  getImgURL,
} from "../services/authService";
import { getUser } from "../utils/storage";
import { toast } from "react-toastify";
import {
  Send,
  CheckCheck,
  ArrowLeft,
  Trash2,
  Search,

  ShieldCheck,
} from "lucide-react";

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeListingId, setActiveListingId] = useState(null);
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("users"); 
  const [loading, setLoading] = useState(true);
  const [showChatMobile, setShowChatMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollRef = useRef(null);
  const currentUser = getUser();
  
  // Robust ID selection
  const currentId = currentUser?._id || currentUser?.id;
  const myRole = currentUser?.role;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchSidebarContacts = async () => {
    try {
      setLoading(true);
      if (myRole === "owner") {
        const [userRes, authRes] = await Promise.all([
          getAllUsersAPI(),
          getAllAuthsAPI(),
        ]);
        const users = userRes.auths || userRes.users || [];
        const admins = (authRes.auths || authRes.data || []).filter(
          (a) => a.role === "admin"
        );
        setContacts(activeTab === "users" ? users : admins);
      } else {
        const ownerRes = await getAllOwnersAPI();
        setContacts(ownerRes.auths || ownerRes.owners || []);
      }
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSidebarContacts();
  }, [activeTab]);

  useEffect(() => {
    let interval;
    if (selectedUser) {
      fetchChatHistory();
      interval = setInterval(fetchChatHistory, 5000);
    }
    return () => clearInterval(interval);
  }, [selectedUser]);

  const fetchChatHistory = async () => {
    if (!selectedUser) return;
    const targetId = selectedUser._id || selectedUser.id;
    try {
      let res;
      if (myRole === "owner") {
        res = selectedUser.role === "admin"
            ? await getChatAdminOwnerHistoryAPI(targetId, currentId)
            : await getChatHistoryAPI(targetId, currentId);
      } else if (myRole === "user") {
        res = await getChatHistoryAPI(currentId, targetId);
      } else {
        res = await getChatAdminOwnerHistoryAPI(currentId, targetId);
      }

      const newMessages = res?.data || [];
      
      // Try to find a listingId in history to keep the context
      if (newMessages.length > 0) {
        const lastWithListing = [...newMessages].reverse().find((m) => m.listingId);
        if (lastWithListing) {
            const lId = lastWithListing.listingId?._id || lastWithListing.listingId;
            if (lId) setActiveListingId(lId);
        }
      }
      setMessages(newMessages);
    } catch (err) {
      console.error("Chat History Error", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const receiverId = selectedUser?._id || selectedUser?.id;

    if (!text.trim() || !selectedUser || !currentId || !receiverId) {
        toast.error("Missing required information to send message");
        return;
    }

    // IMPORTANT: Your backend REQUIRES listingId. 
    // If we don't have one (like in Admin chat), we pass a placeholder or the last known one.
    // Replace '600000000000000000000000' with a valid default ID from your DB if listingId is strictly mandatory for Admins
    const finalListingId = activeListingId || "678e3496030999557008cb0a"; // Example valid ID

    try {
      const payload = {
        senderId: currentId,
        receiverId: receiverId,
        listingId: finalListingId, 
        message: text.trim(),
      };

      const res = await sendMessageAPI(payload);
      if (res) {
        setText("");
        fetchChatHistory();
      }
    } catch (err) {
      toast.error("Error sending: " + (err.response?.data?.message || "Server Error"));
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteChatMessageAPI(msgId);
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-2 py-md-4" style={{ height: "92vh" }}>
      <div className="row g-0 h-100 shadow border rounded-3 overflow-hidden bg-white mx-auto" style={{ maxWidth: "1250px" }}>
        
        {/* --- SIDEBAR --- */}
        <div className={`col-md-4 col-lg-3 d-flex flex-column border-end bg-white h-100 ${showChatMobile ? "d-none d-md-flex" : "d-flex"}`}>
          <div className="p-3 bg-navy text-white d-flex align-items-center justify-content-between" style={{ height: "75px" }}>
            <div className="d-flex align-items-center gap-2">
              <img src={getImgURL(currentUser?.profileImage)} className="rounded-circle border border-2 border-light" width="45" height="45" style={{ objectFit: "cover" }} alt="me" />
              <div className="overflow-hidden">
                <h6 className="mb-0 small fw-bold text-truncate">{currentUser?.fullName}</h6>
                <small className="opacity-75 text-uppercase" style={{ fontSize: "9px" }}>{myRole}</small>
              </div>
            </div>
          </div>

          {myRole === "owner" && (
            <div className="d-flex bg-light border-bottom p-1">
              <button className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === "users" ? "btn-success shadow-sm" : "text-muted"}`} onClick={() => { setActiveTab("users"); setSelectedUser(null); }}>CLIENTS</button>
              <button className={`btn btn-sm flex-grow-1 rounded-pill fw-bold ${activeTab === "admins" ? "btn-success shadow-sm" : "text-muted"}`} onClick={() => { setActiveTab("admins"); setSelectedUser(null); }}>ADMIN</button>
            </div>
          )}

          <div className="p-2 border-bottom">
            <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
              <Search size={16} className="text-muted" />
              <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Search chats" style={{ fontSize: "14px" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="flex-grow-1 overflow-auto custom-scroll">
            {filteredContacts.map((u) => (
              <div key={u._id || u.id} onClick={() => { setSelectedUser(u); setShowChatMobile(true); }} className={`d-flex align-items-center p-3 border-bottom cursor-pointer ${selectedUser?._id === u._id ? "bg-light border-start border-4 border-success" : ""}`}>
                <img src={getImgURL(u.profileImage)} className="rounded-circle me-3 border" width="45" height="45" style={{ objectFit: "cover" }} onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png")} alt="" />
                <div className="flex-grow-1 overflow-hidden">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0 text-truncate fw-bold" style={{ fontSize: "14px" }}>{u.fullName}</h6>
                    <small className="text-muted text-uppercase" style={{ fontSize: "8px" }}>{u.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CHAT VIEW --- */}
        <div className={`col-md-8 col-lg-9 d-flex flex-column h-100 ${!showChatMobile ? "d-none d-md-flex" : "d-flex"}`} style={{ backgroundColor: "#efeae2" }}>
          {selectedUser ? (
            <>
              {/* Header */}
              <div className="p-2 px-3 bg-light border-bottom d-flex align-items-center justify-content-between shadow-sm" style={{ height: "65px" }}>
                <div className="d-flex align-items-center">
                  <button className="btn d-md-none p-0 me-2" onClick={() => setShowChatMobile(false)}><ArrowLeft size={22} /></button>
                  <img src={getImgURL(selectedUser.profileImage)} className="rounded-circle border" width="40" height="40" style={{ objectFit: "cover" }} alt="" />
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "15px" }}>{selectedUser.fullName}</h6>
                    <small className="text-success fw-bold" style={{ fontSize: "11px" }}>online</small>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-90d70fcded21.png')", backgroundSize: "contain" }}>
                {messages.map((msg, i) => {
                  const isMe = (msg.senderId?._id || msg.senderId) === currentId;
                  return (
                    <div key={msg._id || i} className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                      <div className={`p-2 px-3 rounded-3 shadow-sm ${isMe ? "bg-success text-white" : "bg-white text-dark"}`} style={{ maxWidth: "75%", fontSize: "14px" }}>
                        
                        {/* Only show listing info if NOT chatting with admin */}
                        {selectedUser.role !== 'admin' && msg.listingId?.title && (
                          <div className="mb-1 border-start border-3 border-info ps-2 bg-black bg-opacity-10 rounded small py-1" style={{ fontSize: "10px" }}>
                            <strong>Ref:</strong> {msg.listingId.title}
                          </div>
                        )}

                        <div className="d-flex justify-content-between align-items-start gap-2">
                           <span>{msg.message}</span>
                           <Trash2 size={12} className="cursor-pointer opacity-50 hover-opacity-100" onClick={() => handleDeleteMessage(msg._id)} />
                        </div>

                        <div className={`text-end mt-1 ${isMe ? "text-white-50" : "text-muted"}`} style={{ fontSize: "10px" }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {isMe && <CheckCheck size={14} className="ms-1" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-3 bg-light border-top">
                <form className="d-flex gap-2" onSubmit={handleSendMessage}>
                  <input type="text" className="form-control border-0 rounded-pill px-4 shadow-none" placeholder="Type a message" style={{ height: "45px" }} value={text} onChange={(e) => setText(e.target.value)} />
                  <button type="submit" className="btn btn-success rounded-circle p-0" style={{ width: "45px", height: "45px" }} disabled={!text.trim()}><Send size={20} /></button>
                </form>
              </div>
            </>
          ) : (
            <div className="m-auto text-center px-4">
              <ShieldCheck size={70} className="text-success opacity-25 mb-3" />
              <h3 className="text-secondary fw-light">Select a Chat</h3>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .bg-navy { background-color: #001f3f; }
        .cursor-pointer { cursor: pointer; }
        .hover-opacity-100:hover { opacity: 1 !important; }
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Messages; // ENSURE THIS LINE IS HERE