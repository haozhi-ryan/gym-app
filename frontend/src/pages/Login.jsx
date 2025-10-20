import LoginForm from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/LoginLogoutNav.css";


function Login() {
    const navigate = useNavigate();
    return (
        <>
            <LoginForm route="/api/token/" method="login" />
            <div style={{ marginTop: 12, textAlign: "center" }}>
                <button onClick={() => navigate("/register")} className="register-nav-btn">
                Create an account
                </button>
            </div>
        </>
    )    
}

export default Login;