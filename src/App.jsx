import React from "react";
import AppRoutes from "./routes/AppRoutes"; // Import your routes
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Icons
import "./index.css"; // Your custom styles (colors/fonts)
import { ToastContainer } from "react-toastify"; // Toast notifications

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
