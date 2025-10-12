import Form from "../components/Form"
import { LoginForm } from "../components/Form";

function Login() {
    // return <Form route="/api/token/" method="login" />
    return <LoginForm route="/api/token/" method="login" />
}

export default Login;