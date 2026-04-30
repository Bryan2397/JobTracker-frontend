import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import AddJob from "./pages/AddJob";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import EditJob from "./pages/EditJob";
import { useAuth } from "./context/useAuth";
import { ToastContainer } from "react-toastify";

function App() {
  const token = useAuth().getToken();
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/add" element={token != null ? <AddJob /> : <Login />} />
        <Route
          path="/edit/:id"
          element={token != null ? <EditJob /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
