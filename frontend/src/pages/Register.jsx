import LoginForm from "../components/Form"

function Register() {
    return <LoginForm route="/api/user/register/" method="register" />
}

export default Register