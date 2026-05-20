// import React, { useState } from "react";
// import { forgotPasswordAPI } from "../../services/authService";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSendCode = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Pehle "user" role ke saath try karein
//       try {
//         let res = await forgotPasswordAPI({ email, role: "user" });
//         if (res) {
//           toast.success("Verification code sent to user email.");
//           navigate("/verify-otp", { state: { email, type: "forgot" } });
//           return; // Agar success ho gaya to yahi stop kar dein
//         }
//       } catch (err) {
//         console.log("User role not found, trying owner...");
//         // Agar "user" fail hua, to niche wala "owner" logic chalega
//       }

//       // 2. Agar user fail hua, to "owner" role ke saath try karein
//       try {
//         let resOwner = await forgotPasswordAPI({ email, role: "owner" });
//         if (resOwner) {
//           toast.success("Verification code sent to owner email.");
//           navigate("/verify-otp", { state: { email, type: "forgot" } });
//           return;
//         }
//       } catch (errOwner) {
//         // 3. Agar dono roles fail ho gaye
//         console.error("Both roles failed");

//         // Backend agar 404 bhej raha hai to "Email Not Found" dikhayein
//         const errorMsg =
//           errOwner.response?.data?.message || "Email or Role Not Found";
//         toast.error(errorMsg);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100">
//       <div
//         className="card shadow-lg border-0 p-4"
//         style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}>
//         <div className="text-center mb-4">
//           <h4 className="fw-bold" style={{ color: "#001f3f" }}>
//             Forgot Password
//           </h4>
//           <p className="text-muted small">
//             Verify your email to reset password
//           </p>
//         </div>

//         <form onSubmit={handleSendCode}>
//           <div className="mb-4">
//             <label className="form-label small fw-bold">Email Address</label>
//             <input
//               type="email"
//               className="form-control py-2 shadow-sm"
//               placeholder="Enter registered email"
//               required
//               // FIX: added value to avoid uncontrolled component warning
//               value={email || ""}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-lg w-100 text-white shadow-sm"
//             style={{ backgroundColor: "#001f3f", borderRadius: "10px" }}
//             disabled={loading}>
//             {loading ? "Verifying..." : "Send Reset Code"}
//           </button>

//           <div className="text-center mt-3">
//             <Link
//               to="/login"
//               className="text-decoration-none small text-muted fw-bold">
//               Back to Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { forgotPasswordAPI } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- STEP 1: Pehle Admin check karein ---
      try {
        // Hum check kar rahe hain ki kya ye email admin ka hai
        let resAdmin = await forgotPasswordAPI({ email, role: "admin" });
        if (resAdmin) {
          // Agar admin mil gaya, toh aage nahi badhna hai, sirf message dikhana hai
          toast.info(
            "This website is for user login, please login to admin panel.",
          );
          setLoading(false);
          return; // Process stop here
        }
      } catch (err) {
        // Agar admin nahi mila (404), toh code yahan aayega aur niche User check karega
        console.log("Not an admin, checking user/owner...");
      }

      // --- STEP 2: Ab "user" role check karein ---
      try {
        let resUser = await forgotPasswordAPI({ email, role: "user" });
        if (resUser) {
          toast.success("Verification code sent to user email.");
          navigate("/verify-otp", { state: { email, type: "forgot" } });
          return;
        }
      } catch (err) {
        console.log("Not a user, trying owner...");
      }

      // --- STEP 3: Last mein "owner" role check karein ---
      try {
        let resOwner = await forgotPasswordAPI({ email, role: "owner" });
        if (resOwner) {
          toast.success("Verification code sent to owner email.");
          navigate("/verify-otp", { state: { email, type: "forgot" } });
          return;
        }
      } catch (errOwner) {
        // Agar teeno fail ho gaye (Admin, User, Owner)
        const errorMsg =
          errOwner.response?.data?.message || "Email not found in our records.";
        toast.error(errorMsg);
      }
    } catch (globalErr) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}>
        <div className="text-center mb-4">
          <h4 className="fw-bold" style={{ color: "#001f3f" }}>
            Forgot Password
          </h4>
          <p className="text-muted small">
            Verify your email to reset password
          </p>
        </div>

        <form onSubmit={handleSendCode}>
          <div className="mb-4">
            <label className="form-label small fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control py-2 shadow-sm"
              placeholder="Enter registered email"
              required
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100 text-white shadow-sm"
            style={{ backgroundColor: "#001f3f", borderRadius: "10px" }}
            disabled={loading}>
            {loading ? "Verifying..." : "Send Reset Code"}
          </button>

          <div className="text-center mt-3">
            <Link
              to="/login"
              className="text-decoration-none small text-muted fw-bold">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;