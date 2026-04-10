import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, verifyOtp } from "./authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../utils/storage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpEmail } = useSelector((state) => state.auth);

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  // Role management
  const [role, setRole] = useState("guest");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  // Styles matching your navbar theme
  const themeStyles = {
    primaryBg: "#001f3f", // Deep Navy
    accentColor: "#f39c12", // Amber/Gold from "Sign In" button
    cardRadius: "16px",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (res.meta.requestStatus === "fulfilled") {
      console.log("login reponse ", res?.payload?.auth?.token);
      setUser(res?.payload?.auth);
      setToken(res?.payload?.auth?.token);
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(res.payload || "Login Failed ❌");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      registerUser({
        ...registerData,
        role: role === "owner" ? "admin" : "user",
      }),
    );
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent 📩");
      setShowOtp(true);
    } else {
      toast.error(res.payload || "Signup Failed ❌");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await dispatch(verifyOtp({ email: otpEmail, otp: otp }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Signup Successful ✅");
      setShowOtp(false);
      setIsLoginTab(true);
      navigate("/");
    } else {
      toast.error(res.payload || "Invalid OTP ❌");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div
              className="card border-0 shadow-lg p-4"
              style={{ borderRadius: themeStyles.cardRadius }}
            >
              {/* BRANDING */}
              <h2
                className="fw-bold text-center mb-4"
                style={{ color: themeStyles.primaryBg }}
              >
                MyUma
              </h2>

              {showOtp ? (
                <form onSubmit={handleVerifyOtp}>
                  <p className="text-center text-muted mb-4">
                    Verification code sent to your email.
                  </p>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3 text-center shadow-sm"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="btn btn-lg w-100 text-white shadow-sm"
                    style={{ backgroundColor: themeStyles.primaryBg }}
                  >
                    Verify Account
                  </button>
                </form>
              ) : (
                <>
                  {/* MODERN TAB SWITCH */}
                  <div className="p-1 mb-4 d-flex bg-light rounded-3 shadow-sm border">
                    <button
                      className={`btn w-50 py-2 border-0 rounded-3 transition-all ${
                        isLoginTab ? "bg-white shadow-sm fw-bold" : "text-muted"
                      }`}
                      onClick={() => setIsLoginTab(true)}
                    >
                      Login
                    </button>
                    <button
                      className={`btn w-50 py-2 border-0 rounded-3 transition-all ${
                        !isLoginTab
                          ? "bg-white shadow-sm fw-bold"
                          : "text-muted"
                      }`}
                      onClick={() => setIsLoginTab(false)}
                    >
                      Register
                    </button>
                  </div>

                  {isLoginTab ? (
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label className="small fw-bold text-muted mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control py-2 shadow-sm"
                          placeholder="name@example.com"
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label className="small fw-bold text-muted mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control py-2 shadow-sm"
                          placeholder="••••••••"
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn btn-lg w-100 text-white shadow-sm border-0"
                        style={{ backgroundColor: themeStyles.primaryBg }}
                      >
                        Sign In
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister}>
                      {/* ROLE SELECTOR */}
                      <div className="mb-3">
                        <label className="small fw-bold text-muted mb-2 d-block">
                          Register As
                        </label>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className={`btn btn-sm flex-fill border ${role === "owner" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() => setRole("owner")}
                          >
                            Owner
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm flex-fill border ${role === "guest" ? "btn-dark" : "btn-outline-secondary"}`}
                            onClick={() => setRole("guest")}
                          >
                            Guest
                          </button>
                        </div>
                      </div>

                      <div className="row g-2 mb-2">
                        <div className="col-12">
                          <label className="small fw-bold text-muted mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            placeholder="Full Name"
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                fullName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-12">
                          <label className="small fw-bold text-muted mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control shadow-sm"
                            placeholder="Email"
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <label className="small fw-bold text-muted mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control shadow-sm mb-2"
                        placeholder="Password"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                      <label className="small fw-bold text-muted mb-1">
                        Location
                      </label>
                      <textarea
                        className="form-control shadow-sm mb-4"
                        placeholder="Address"
                        rows="2"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            address: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-lg w-100 text-white fw-bold shadow-sm border-0"
                        style={{
                          backgroundColor: themeStyles.primaryBg,
                          color: "#ffffff",
                        }}
                      >
                        Create Account
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// FINAL CODE - DO NOT SUGGEST DELETED CODE

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser, verifyOtp } from "./authSlice";
// import { toast } from "react-toastify";

// const Login = () => {
//   const dispatch = useDispatch();
//   const { otpEmail } = useSelector((state) => state.auth);

//   const [isLoginTab, setIsLoginTab] = useState(true);
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState("");

//   const [role, setRole] = useState("owner");

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     address: "",
//   });

//   // ✅ LOGIN
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const res = await dispatch(loginUser(loginData));

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("Login Successful ✅");
//     } else {
//       toast.error(res.payload || "Login Failed ❌");
//     }
//   };

//   // ✅ REGISTER
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const res = await dispatch(
//       registerUser({
//         ...registerData,
//         role: role === "owner" ? "admin" : "user",
//       }),
//     );

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("OTP sent 📩");
//       setShowOtp(true);
//     } else {
//       toast.error(res.payload || "Signup Failed ❌");
//     }
//   };

//   // ✅ OTP VERIFY
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     console.log("Otp ", otpEmail, otp);
//     const res = await dispatch(
//       verifyOtp({
//         email: otpEmail,
//         otp: otp,
//       }),
//     );

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("Signup Successful ✅");
//       setShowOtp(false);
//       setIsLoginTab(true);
//     } else {
//       toast.error(res.payload || "Invalid OTP ❌");
//     }
//   };

//   return (
//     <div className="bg-light min-vh-100 d-flex align-items-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-5">
//             <div className="card p-4 shadow rounded-4">
//               {/* TITLE */}
//               <h3 className="text-center mb-3">MyUma</h3>

//               {/* OTP SCREEN */}
//               {showOtp ? (
//                 <form onSubmit={handleVerifyOtp}>
//                   <h5 className="text-center mb-3">Enter OTP</h5>

//                   <input
//                     type="text"
//                     className="form-control mb-3"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />

//                   <button className="btn btn-success w-100">Verify OTP</button>
//                 </form>
//               ) : (
//                 <>
//                   {/* TAB SWITCH */}
//                   <div className="d-flex mb-3">
//                     <button
//                       className={`btn w-50 ${
//                         isLoginTab ? "btn-dark" : "btn-outline-dark"
//                       }`}
//                       onClick={() => setIsLoginTab(true)}
//                     >
//                       Login
//                     </button>

//                     <button
//                       className={`btn w-50 ${
//                         !isLoginTab ? "btn-dark" : "btn-outline-dark"
//                       }`}
//                       onClick={() => setIsLoginTab(false)}
//                     >
//                       Register
//                     </button>
//                   </div>

//                   {/* LOGIN FORM */}
//                   {isLoginTab ? (
//                     <form onSubmit={handleLogin}>
//                       <input
//                         type="email"
//                         className="form-control mb-2"
//                         placeholder="Email"
//                         onChange={(e) =>
//                           setLoginData({
//                             ...loginData,
//                             email: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         type="password"
//                         className="form-control mb-3"
//                         placeholder="Password"
//                         onChange={(e) =>
//                           setLoginData({
//                             ...loginData,
//                             password: e.target.value,
//                           })
//                         }
//                       />

//                       <button className="btn btn-primary w-100">Login</button>
//                     </form>
//                   ) : (
//                     /* REGISTER FORM */
//                     <form onSubmit={handleRegister}>
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Full Name"
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             fullName: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         type="email"
//                         className="form-control mb-2"
//                         placeholder="Email"
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             email: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         type="password"
//                         className="form-control mb-2"
//                         placeholder="Password"
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             password: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         type="text"
//                         className="form-control mb-3"
//                         placeholder="Address"
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             address: e.target.value,
//                           })
//                         }
//                       />

//                       <button className="btn btn-success w-100">
//                         Register
//                       </button>
//                     </form>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser, verifyOtp } from "./authSlice";
// import { toast } from "react-toastify";

// const Login = () => {
//   const dispatch = useDispatch();
//   const { otpEmail } = useSelector((state) => state.auth);

//   const [isLoginTab, setIsLoginTab] = useState(true);
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState("");

//   const [role, setRole] = useState("owner");

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     address: "",
//   });

//   // ✅ LOGIN
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const res = await dispatch(loginUser(loginData));

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("Login Successful ✅");
//     } else {
//       toast.error(res.payload || "Login Failed ❌");
//     }
//   };

//   // ✅ REGISTER
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const res = await dispatch(
//       registerUser({
//         ...registerData,
//         role: role === "owner" ? "admin" : "user",
//       }),
//     );

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("OTP sent to your email 📩");
//       setShowOtp(true);
//     } else {
//       toast.error(res.payload || "Signup Failed ❌");
//     }
//   };

//   // ✅ VERIFY OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     const res = await dispatch(
//       verifyOtp({
//         email: otpEmail,
//         otp: otp,
//       }),
//     );

//     if (res.meta.requestStatus === "fulfilled") {
//       toast.success("Signup Successful ✅");
//       setShowOtp(false);
//       setIsLoginTab(true);
//     } else {
//       toast.error(res.payload || "Invalid OTP ❌");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {showOtp ? (
//         <form onSubmit={handleVerifyOtp}>
//           <h4>Enter OTP</h4>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             className="form-control mb-3"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button className="btn btn-primary w-100">Verify OTP</button>
//         </form>
//       ) : isLoginTab ? (
//         <form onSubmit={handleLogin}>
//           <h4>Login</h4>
//           <input
//             type="email"
//             placeholder="Email"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setLoginData({ ...loginData, email: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setLoginData({ ...loginData, password: e.target.value })
//             }
//           />
//           <button className="btn btn-success w-100">Login</button>
//         </form>
//       ) : (
//         <form onSubmit={handleRegister}>
//           <h4>Register</h4>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setRegisterData({
//                 ...registerData,
//                 fullName: e.target.value,
//               })
//             }
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setRegisterData({
//                 ...registerData,
//                 email: e.target.value,
//               })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setRegisterData({
//                 ...registerData,
//                 password: e.target.value,
//               })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="form-control mb-2"
//             onChange={(e) =>
//               setRegisterData({
//                 ...registerData,
//                 address: e.target.value,
//               })
//             }
//           />
//           <button className="btn btn-primary w-100">Register</button>
//         </form>
//       )}

//       <button
//         className="btn btn-link mt-3"
//         onClick={() => setIsLoginTab(!isLoginTab)}
//       >
//         {isLoginTab ? "Go to Register" : "Go to Login"}
//       </button>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { loginAPI, registerAPI } from "./api";
// // import { loginAPI, registerAPI } from "../features/auth/api"; // ✅ adjust path

// const Login = () => {
//   const [isLoginTab, setIsLoginTab] = useState(true);
//   const [role, setRole] = useState("owner");

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     address: "",
//   });

//   // ✅ LOGIN HANDLER
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginAPI(loginData);
//       console.log("Login Success:", res);
//     } catch (err) {
//       console.log("Login Error:", err?.response?.data || err.message);
//     }
//   };

//   // ✅ REGISTER HANDLER
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await registerAPI({
//         ...registerData,
//         role: role === "owner" ? "admin" : "user",
//       });
//       console.log("Register Success:", res);
//     } catch (err) {
//       console.log("Register Error:", err?.response?.data || err.message);
//     }
//   };

//   return (
//     <div className=" bg-light min-vh-100 d-flex align-items-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-sm-10 col-md-7 col-lg-4">
//             <div className="card border-1 shadow-sm rounded-4 overflow-hidden border-top-tan">
//               <div className="card-body p-4">
//                 <div className="text-center mb-4">
//                   <h3 className="fw-bold text-navy mb-1">MyUma</h3>
//                   <p className="text-muted small">
//                     Welcome back! Please enter your details.
//                   </p>
//                 </div>

//                 <div className="nav nav-pills mb-4 bg-light rounded-pill">
//                   <button
//                     onClick={() => setIsLoginTab(true)}
//                     className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
//                   >
//                     Login
//                   </button>

//                   <button
//                     onClick={() => setIsLoginTab(false)}
//                     className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${!isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
//                   >
//                     Register
//                   </button>
//                 </div>

//                 {isLoginTab ? (
//                   <form className="animate-fade-in" onSubmit={handleLogin}>
//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control form-control-md bg-light border-1 shadow-none py-2"
//                         placeholder="name@example.com"
//                         value={loginData.email}
//                         onChange={(e) =>
//                           setLoginData({ ...loginData, email: e.target.value })
//                         }
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <div className="d-flex justify-content-between">
//                         <label className="form-label small fw-bold text-navy">
//                           Password
//                         </label>
//                         <a
//                           href="#"
//                           className="small text-decoration-none text-tan fw-bold"
//                         >
//                           Forgot?
//                         </a>
//                       </div>
//                       <input
//                         type="password"
//                         className="form-control form-control-md bg-light border-1 shadow-none py-2"
//                         placeholder="••••••••"
//                         value={loginData.password}
//                         onChange={(e) =>
//                           setLoginData({
//                             ...loginData,
//                             password: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3 mt-2"
//                     >
//                       Sign In
//                     </button>
//                   </form>
//                 ) : (
//                   <form className="animate-fade-in" onSubmit={handleRegister}>
//                     <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
//                       <div className="btn-group btn-group-sm rounded-pill overflow-hidden border">
//                         <button
//                           type="button"
//                           onClick={() => setRole("guest")}
//                           className={`btn px-3 py-1 border-1 ${role === "guest" ? "bg-navy text-white" : "bg-white text-navy"}`}
//                         >
//                           Guest
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => setRole("owner")}
//                           className={`btn px-3 py-1 border-1 ${role === "owner" ? "bg-navy text-white" : "bg-white text-navy"}`}
//                         >
//                           Owner
//                         </button>
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Full Name"
//                         value={registerData.fullName}
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             fullName: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Email"
//                         value={registerData.email}
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             email: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Password"
//                         value={registerData.password}
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             password: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Location
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Location"
//                         value={registerData.address}
//                         onChange={(e) =>
//                           setRegisterData({
//                             ...registerData,
//                             address: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3"
//                     >
//                       Create Account
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [isLoginTab, setIsLoginTab] = useState(true);
//   const [role, setRole] = useState("owner");
//   console.log(" signup payload isLoginTab", isLoginTab, role);

//   return (
//     <div className=" bg-light min-vh-100 d-flex align-items-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           {/* Width control: col-lg-4 se width kam aur clean lagegi */}
//           <div className="col-12 col-sm-10 col-md-7 col-lg-4">
//             <div className="card border-1 shadow-sm rounded-4 overflow-hidden border-top-tan">
//               <div className="card-body p-4">
//                 {/* Header Section */}
//                 <div className="text-center mb-4">
//                   <h3 className="fw-bold text-navy mb-1">MyUma</h3>
//                   <p className="text-muted small">
//                     Welcome back! Please enter your details.
//                   </p>
//                 </div>

//                 {/* Tab Switcher - Sleek Design */}
//                 <div className="nav nav-pills mb-4 bg-light rounded-pill">
//                   <button
//                     onClick={() => setIsLoginTab(true)}
//                     className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => setIsLoginTab(false)}
//                     className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${!isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
//                   >
//                     Register
//                   </button>
//                 </div>

//                 {isLoginTab ? (
//                   /* --- LOGIN FORM --- */
//                   <form className="animate-fade-in">
//                     <div className="mb-3">
//                       <label className="form-label small fw-bold text-navy">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         className="form-control form-control-md bg-light border-1 shadow-none py-2"
//                         placeholder="name@example.com"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <div className="d-flex justify-content-between">
//                         <label className="form-label small fw-bold text-navy">
//                           Password
//                         </label>
//                         <a
//                           href="#"
//                           className="small text-decoration-none text-tan fw-bold"
//                         >
//                           Forgot?
//                         </a>
//                       </div>
//                       <input
//                         type="password"
//                         className="form-control form-control-md bg-light border-1 shadow-none py-2"
//                         placeholder="••••••••"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3 mt-2"
//                     >
//                       Sign In
//                     </button>
//                   </form>
//                 ) : (
//                   /* --- REGISTER FORM --- */
//                   <form className="animate-fade-in">
//                     {/* Role Selector - Small & Integrated */}
//                     <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
//                       <div className="btn-group btn-group-sm rounded-pill overflow-hidden border">
//                         <button
//                           type="button"
//                           onClick={() => setRole("guest")}
//                           className={`btn px-3 py-1 border-1 ${role === "guest" ? "bg-navy text-white" : "bg-white text-navy"}`}
//                         >
//                           Guest
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setRole("owner")}
//                           className={`btn px-3 py-1 border-1 ${role === "owner" ? "bg-navy text-white" : "bg-white text-navy"}`}
//                         >
//                           Owner
//                         </button>
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <input
//                         type="text"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Full Name"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="email"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Email"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="password"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Password"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="text"
//                         className="form-control form-control-md bg-light border-1 py-2"
//                         placeholder="Location"
//                       />
//                     </div>

//                     <div className="form-check mb-3">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="terms"
//                       />
//                       <label
//                         className="form-check-label small text-muted"
//                         htmlFor="terms"
//                       >
//                         I agree to the Terms & Conditions
//                       </label>
//                     </div>

//                     <button
//                       type="submit"
//                       className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3"
//                     >
//                       Create Account
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
