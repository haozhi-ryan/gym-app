import LoginForm from "../components/Form";

function Login() {
    return <LoginForm route="/api/token/" method="login" />
}

export default Login;