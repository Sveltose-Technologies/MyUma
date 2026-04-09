import React from "react";
import AppRoutes from "./routes/AppRoutes"; // Import your routes
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Icons
import "./index.css"; // Your custom styles (colors/fonts)

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
