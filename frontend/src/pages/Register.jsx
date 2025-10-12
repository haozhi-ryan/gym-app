import Form from "../components/Form"
import { LoginForm } from "../components/Form"

function Register() {
    // return <Form route="/api/user/register/" method="register" />
    return <LoginForm route="/api/user/register/" method="register" />
}

export default Register