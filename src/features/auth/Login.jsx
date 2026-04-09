import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginAPI, registerAPI } from "./api";
// import { loginAPI, registerAPI } from "../features/auth/api"; // ✅ adjust path

const Login = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [role, setRole] = useState("owner");

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

  // ✅ LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(loginData);
      console.log("Login Success:", res);
    } catch (err) {
      console.log("Login Error:", err?.response?.data || err.message);
    }
  };

  // ✅ REGISTER HANDLER
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerAPI({
        ...registerData,
        role: role === "owner" ? "admin" : "user",
      });
      console.log("Register Success:", res);
    } catch (err) {
      console.log("Register Error:", err?.response?.data || err.message);
    }
  };

  return (
    <div className=" bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-4">
            <div className="card border-1 shadow-sm rounded-4 overflow-hidden border-top-tan">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-navy mb-1">MyUma</h3>
                  <p className="text-muted small">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                <div className="nav nav-pills mb-4 bg-light rounded-pill">
                  <button
                    onClick={() => setIsLoginTab(true)}
                    className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setIsLoginTab(false)}
                    className={`nav-link w-50 rounded-pill fw-bold py-2 border-1 ${!isLoginTab ? "bg-navy text-white shadow-sm" : "text-navy opacity-75"}`}
                  >
                    Register
                  </button>
                </div>

                {isLoginTab ? (
                  <form className="animate-fade-in" onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-navy">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-md bg-light border-1 shadow-none py-2"
                        placeholder="name@example.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label small fw-bold text-navy">
                          Password
                        </label>
                        <a
                          href="#"
                          className="small text-decoration-none text-tan fw-bold"
                        >
                          Forgot?
                        </a>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-md bg-light border-1 shadow-none py-2"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3 mt-2"
                    >
                      Sign In
                    </button>
                  </form>
                ) : (
                  <form className="animate-fade-in" onSubmit={handleRegister}>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                      <div className="btn-group btn-group-sm rounded-pill overflow-hidden border">
                        <button
                          type="button"
                          onClick={() => setRole("guest")}
                          className={`btn px-3 py-1 border-1 ${role === "guest" ? "bg-navy text-white" : "bg-white text-navy"}`}
                        >
                          Guest
                        </button>

                        <button
                          type="button"
                          onClick={() => setRole("owner")}
                          className={`btn px-3 py-1 border-1 ${role === "owner" ? "bg-navy text-white" : "bg-white text-navy"}`}
                        >
                          Owner
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-md bg-light border-1 py-2"
                        placeholder="Full Name"
                        value={registerData.fullName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control form-control-md bg-light border-1 py-2"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control form-control-md bg-light border-1 py-2"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-md bg-light border-1 py-2"
                        placeholder="Location"
                        value={registerData.address}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn text-white bg-navy w-100 py-2 fw-bold rounded-3"
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

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
