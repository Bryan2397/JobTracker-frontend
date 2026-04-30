import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const backgroundStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  interface LoginForm {
    email: string;
    password: string;
  }

  const handleChange = (update: Partial<LoginForm>) => {
    setLogin((login) => ({ ...login, ...update }));
  };

  async function handleSubmit() {
    try {
      if (login.email === "" || login.password === "") {
        alert("Please fill out all fields");
        return;
      }

      const request = api.post("/api/auth/login", login);
      const res = await toast.promise(
        request,
        {
          pending: "Logging in...",
          success: "Login Successful",
          error: "Login failed, please try again",
        },
        {
          position: "top-center",
        },
      );
      const token = res.data;
      await localStorage.setItem("token", token);
      context?.login(login.email, token);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.log("error message: ", error);
      toast.error("Error in signing in. Please try again");
    }
  }

  const [login, setLogin] = useState<LoginForm>({
    email: "",
    password: "",
  });

  return (
    <div style={backgroundStyle}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="card p-5 shadow-lg">
          <h1 className="text-center mb-4">Login here</h1>

          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={login.email}
                onChange={(e) => handleChange({ email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={(e) => handleChange({ password: e.target.value })}
                required
              />
            </div>
          </form>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              borderRadius: "5px",
              height: "50px",
              width: "200px",
              alignSelf: "center",
              fontSize: "20px",
            }}
          >
            Login
          </button>
          <Link
            style={{ alignSelf: "center", marginTop: "30px", fontSize: "20px" }}
            to={"/signup"}
          >
            Don't have an account? Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
