import LoginForm from "../components/Form"
import { useNavigate } from "react-router-dom";
import "../styles/LoginLogoutNav.css";

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <LoginForm route="/api/user/register/" method="register" />
      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button onClick={() => navigate("/login")} className="login-nav-btn">
          Back to login
        </button>
      </div>
    </>
  );
}

export default Register