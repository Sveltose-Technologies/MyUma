// import React from "react";

// const Messages = () => {
//   const contacts = [
//     {
//       id: 1,
//       name: "John Doe",
//       lastMsg: "Is it available?",
//       time: "2m ago",
//       active: true,
//       unread: 2,
//     },
//     {
//       id: 2,
//       name: "Sarah Smith",
//       lastMsg: "Sent the docs.",
//       time: "1h ago",
//       active: false,
//       unread: 0,
//     },
//   ];

//   return (
//     <div className="container-fluid p-0">
//       {/* 
//          Height is set to 85vh to ensure it stays within the screen. 
//          'd-flex' ensures the footer is pushed to the bottom. 
//       */}
//       <div
//         className="card border-0 shadow-sm d-flex flex-row overflow-hidden"
//         style={{ height: "85vh", borderRadius: "0" }}>
//         {/* --- LEFT SIDEBAR --- */}
//         <div className="col-lg-4 col-md-5 border-end d-flex flex-column bg-white">
//           <div className="p-3 border-bottom bg-white sticky-top">
//             <h5 className="fw-800 text-navy mb-3 ls-1">CHATS</h5>
//             <div className="input-group bg-light rounded-pill px-3 border border-gold">
//               <span className="input-group-text bg-transparent border-0 text-muted">
//                 <i className="bi bi-search"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control bg-transparent border-0 shadow-none py-2"
//                 placeholder="Search..."
//               />
//             </div>
//           </div>

//           <div className="overflow-auto flex-grow-1">
//             {contacts.map((contact) => (
//               <div
//                 key={contact.id}
//                 className={`p-3 d-flex align-items-center border-bottom transition-hover cursor-pointer ${contact.active ? "bg-light border-gold-top" : ""}`}>
//                 <div className="uma-cart me-3">
//                   <div
//                     className="rounded-circle bg-navy text-white d-flex align-items-center justify-content-center fw-bold"
//                     style={{ width: "45px", height: "45px" }}>
//                     {contact.name.charAt(0)}
//                   </div>
//                   {contact.unread > 0 && (
//                     <span className="uma-badge-tan">{contact.unread}</span>
//                   )}
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                   <div className="d-flex justify-content-between">
//                     <h6 className="mb-0 fw-800 text-navy text-truncate">
//                       {contact.name}
//                     </h6>
//                     <small className="text-muted small">{contact.time}</small>
//                   </div>
//                   <p className="small text-muted mb-0 text-truncate">
//                     {contact.lastMsg}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: CHAT WINDOW --- */}
//         <div className="col-lg-8 col-md-7 d-flex flex-column bg-light">
//           {/* Header */}
//           <div className="p-3 bg-navy text-white d-flex align-items-center justify-content-between shadow-sm">
//             <div className="d-flex align-items-center">
//               <div
//                 className="rounded-circle bg-tan text-navy fw-800 d-flex align-items-center justify-content-center me-3"
//                 style={{ width: "40px", height: "40px" }}>
//                 JD
//               </div>
//               <h6 className="mb-0 fw-800 ls-1">John Doe</h6>
//             </div>
         
//           </div>

//           {/* Chat Body - This section scrolls */}
//           <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-white">
//             <div className="d-flex flex-column align-items-start">
//               <div
//                 className="p-3 rounded-4 shadow-sm border border-gold"
//                 style={{ maxWidth: "75%", backgroundColor: "#f8f9fa" }}>
//                 <p className="mb-0 text-navy">
//                   Hello! Please send over the location details.
//                 </p>
//               </div>
//               <small className="text-muted mt-1 ms-2">10:35 AM</small>
//             </div>

//             <div className="d-flex flex-column align-items-end">
//               <div
//                 className="bg-navy text-white p-3 rounded-4 shadow-sm"
//                 style={{ maxWidth: "75%" }}>
//                 <p className="mb-0">Sure thing! Sending it now.</p>
//               </div>
//               <small className="text-muted mt-1 me-2">10:36 AM</small>
//             </div>
//           </div>

//           {/* FOOTER: This is what was missing */}
//           <div className="p-3 bg-white border-top shadow-lg">
//             <form className="d-flex align-items-center gap-2">
//               <button
//                 type="button"
//                 className="btn btn-light rounded-circle border">
//                 <i className="bi bi-paperclip text-navy"></i>
//               </button>

//               <div className="flex-grow-1">
//                 <input
//                   type="text"
//                   className="form-control border-0 bg-light py-2 px-3 rounded-pill shadow-none border border-gold"
//                   placeholder="Type a message..."
//                   required
//                 />
//               </div>

//               {/* Sent Icon inside your Navy Button Class */}
//               <button
//                 type="submit"
//                 className="uma-btn-navy d-flex align-items-center justify-content-center"
//                 style={{
//                   width: "45px",
//                   height: "45px",
//                   borderRadius: "50%",
//                   padding: "0",
//                 }}>
//                 <i className="bi bi-send-fill fs-5"></i>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


//use Socket io 


// import React, { useState, useEffect, useRef } from "react";
// import { socket } from "../services/socket";
// import { getChatListAPI, getChatHistoryAPI } from "../services/authService";

// const Messages = () => {
//   const [contacts, setContacts] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [text, setText] = useState("");
//   const scrollRef = useRef(null);

//   // Get current logged-in user ID (assuming it's in localStorage)
//   const currentUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     // 1. Connect Socket
//     socket.connect();
    
//     // Join a room with my own ID to receive private messages
//     if (currentUser?._id) {
//       socket.emit("join", currentUser._id);
//     }

//     // 2. Fetch Chat List (Sidebar)
//     loadChatList();

//     // 3. Listen for incoming messages
//     socket.on("receive_message", (newMessage) => {
//       // If the message is from the user I'm currently chatting with, add to screen
//       setMessages((prev) => [...prev, newMessage]);
//       loadChatList(); // Refresh sidebar to show latest msg
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.disconnect();
//     };
//   }, []);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const loadChatList = async () => {
//     const data = await getChatListAPI();
//     if (data.success) setContacts(data.conversations);
//   };

//   const selectChat = async (user) => {
//     setSelectedUser(user);
//     const data = await getChatHistoryAPI(user._id);
//     if (data.success) setMessages(data.history);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!text.trim() || !selectedUser) return;

//     const messageData = {
//       senderId: currentUser._id,
//       receiverId: selectedUser._id,
//       message: text,
//       time: new Date().toISOString(),
//     };

//     // Emit via Socket (Real-time)
//     socket.emit("send_message", messageData);

//     // Update UI instantly
//     setMessages((prev) => [...prev, messageData]);
//     setText("");
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div className="card border-0 shadow-sm d-flex flex-row overflow-hidden" style={{ height: "85vh" }}>
        
//         {/* --- SIDEBAR: CONTACTS --- */}
//         <div className="col-lg-4 col-md-5 border-end d-flex flex-column bg-white">
//           <div className="p-3 border-bottom">
//             <h5 className="fw-800 text-navy mb-3">CHATS</h5>
//             <input type="text" className="form-control rounded-pill" placeholder="Search..." />
//           </div>
//           <div className="overflow-auto flex-grow-1">
//             {contacts.map((contact) => (
//               <div
//                 key={contact._id}
//                 onClick={() => selectChat(contact)}
//                 className={`p-3 d-flex align-items-center border-bottom cursor-pointer ${selectedUser?._id === contact._id ? "bg-light" : ""}`}
//               >
//                 <div className="rounded-circle bg-navy text-white d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
//                   {contact.name.charAt(0)}
//                 </div>
//                 <div className="flex-grow-1">
//                   <h6 className="mb-0 fw-bold">{contact.name}</h6>
//                   <p className="small text-muted mb-0">{contact.lastMsg}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- CHAT WINDOW --- */}
//         <div className="col-lg-8 col-md-7 d-flex flex-column bg-light">
//           {selectedUser ? (
//             <>
//               <div className="p-3 bg-navy text-white d-flex align-items-center">
//                 <div className="rounded-circle bg-tan text-navy fw-bold d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
//                   {selectedUser.name.charAt(0)}
//                 </div>
//                 <h6 className="mb-0">{selectedUser.name}</h6>
//               </div>

//               <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3 bg-white">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`d-flex flex-column ${msg.senderId === currentUser._id ? "align-items-end" : "align-items-start"}`}>
//                     <div className={`p-3 rounded-4 ${msg.senderId === currentUser._id ? "bg-navy text-white" : "bg-light border"}`} style={{ maxWidth: "75%" }}>
//                       <p className="mb-0">{msg.message}</p>
//                     </div>
//                     <small className="text-muted mt-1">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
//                   </div>
//                 ))}
//                 <div ref={scrollRef} />
//               </div>

//               <div className="p-3 bg-white border-top">
//                 <form className="d-flex gap-2" onSubmit={handleSendMessage}>
//                   <input
//                     type="text"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     className="form-control rounded-pill"
//                     placeholder="Type a message..."
//                   />
//                   <button type="submit" className="btn btn-primary rounded-circle">
//                     <i className="bi bi-send-fill"></i>
//                   </button>
//                 </form>
//               </div>
//             </>
//           ) : (
//             <div className="d-flex align-items-center justify-content-center h-100">
//               <p className="text-muted">Select a contact to start chatting</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;

import React from 'react'

function Messages() {
  return (
    <div>Messages</div>
  )
}

export default Messages