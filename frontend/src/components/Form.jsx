/**
 * This component handled both login and registration forms. It sent the user’s credentials to the backend, 
 * stored JWT tokens after login, redirected the user, and showed a loading spinner during requests.
 */

// Import React hooks and utilities
import { useState } from "react";                 // For managing component state
import api from "../api";                         // Axios instance for API requests
import { useNavigate } from "react-router-dom";   // For redirecting users after login/register
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Token keys for localStorage
import "../styles/Form.css"                       // Import form styling
import LoadingIndicator from "./LoadingIndicator"; // Loading spinner component

function Form({ route, method }) {
    // Local state for user input and loading status
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Determine whether this form is for login or registration
    const name = method === "login" ? "Login" : "Register";

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);      // Show loading indicator
        e.preventDefault();    // Prevent page reload

        try {
            // Send POST request to backend with username and password
            const res = await api.post(route, { username, password });

            // If logging in, save tokens and redirect to homepage
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } 
            // If registering, redirect to login page after successful signup
            else {
                navigate("/login");
            }
        } catch (error) {
            // Show an alert if something went wrong
            alert(error);
        } finally {
            // Hide loading indicator when done
            setLoading(false);
        }
    };

    return (
        // The form UI
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>

            {/* Username input field */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            {/* Password input field */}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            {/* Show loading spinner when waiting for response */}
            {loading && <LoadingIndicator />}

            {/* Submit button */}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;


/** ---------- NEW ---------- */
import { authApi } from "../api";

function LoginForm({ route, method }) {
    // Local state for user input and loading status
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Determine whether this form is for login or registration
    const name = method === "login" ? "Login" : "Register";

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);      // Show loading indicator
        e.preventDefault();    // Prevent page reload

        try {
            // Send POST request to backend with username and password
            const res = await authApi.post(route, { username, password });

            // If logging in, save tokens and redirect to homepage
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } 
            // If registering, redirect to login page after successful signup
            else {
                navigate("/login");
            }
        } catch (error) {
            // Show an alert if something went wrong
            alert(error);
        } finally {
            // Hide loading indicator when done
            setLoading(false);
        }
    };

    return (
        // The form UI
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>

            {/* Username input field */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            {/* Password input field */}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            {/* Show loading spinner when waiting for response */}
            {loading && <LoadingIndicator />}

            {/* Submit button */}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export {LoginForm};
/** ------------------------- */