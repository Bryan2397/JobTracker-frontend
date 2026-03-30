import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import AddJob from "./pages/AddJob";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={token != null ? <DashBoard /> : <Login />}
        />
        <Route path="/add" element={token != null ? <AddJob /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
