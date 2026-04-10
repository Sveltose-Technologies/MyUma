import React from "react";
import AppRoutes from "./routes/AppRoutes"; // Import your routes
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <--- YE LINE ZAROORI HAI
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Icons

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
