import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";

const backgroundStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Signup = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  interface SignupForm {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }

  const handleChange = (update: Partial<SignupForm>) => {
    setSignup((signup) => ({ ...signup, ...update }));
  };

  async function handleSubmit() {
    try {
      if (signup.email.trim() === "" || signup.password.trim() === "") {
        alert("Please fill out email and password");
        return;
      }

      const res = await api.post("/api/auth/register", signup);

      const token = res.data;
      context?.login(signup.email, token);
      navigate("/dashboard");
      alert("Successfull signup");
    } catch (error: unknown) {
      console.log("error message: ", error);
      alert("Error in signing in. Please try again");
    }
  }

  const [signup, setSignup] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div style={backgroundStyle}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="card p-5 shadow-lg">
          <h1 className="text-center mb-4">Sign up here</h1>

          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={signup.email}
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
                value={signup.password}
                onChange={(e) => handleChange({ password: e.target.value })}
                required
              />
            </div>

            <h5>Optional</h5>

            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={signup.firstName}
                onChange={(e) => handleChange({ firstName: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={signup.lastName}
                onChange={(e) => handleChange({ lastName: e.target.value })}
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
            Register
          </button>
          <Link
            style={{ alignSelf: "center", marginTop: "30px", fontSize: "20px" }}
            to={"/login"}
          >
            Already have an account? Login Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
