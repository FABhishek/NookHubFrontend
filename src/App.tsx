import Header from "./components/Header";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signup from "./pages/SignUp-Login/Signup";
import LogIn from "./pages/SignUp-Login/Login";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {

  const location = useLocation(); // returns the current url we are at

  const isDashboard = location.pathname === "/dashboard";

  return (
      <div>
         {!isDashboard && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
  );
}

export default App;
