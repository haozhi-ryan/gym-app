/**
 * This file defined a ProtectedRoute component that acted as a security gate for private pages in a React app. 
 * It checked whether a user had a valid JWT access token stored in their browser, and if not, tried to refresh 
 * it using the refresh token. If the tokens were valid, the user could access the protected page (the children component). 
 * If not, the user was automatically redirected to the login page. It ensured that only authenticated users could view 
 * certain routes in the application.
 */

// Import tools and libraries
import { Navigate } from "react-router-dom";     // Used to redirect users to another route
import { jwtDecode } from "jwt-decode";          // Decodes JWT tokens to check their expiration
import api from "../api";                        // Axios instance for making API requests
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";  // Token keys used in localStorage
import { useState, useEffect } from "react";     // React hooks for state and side effects

// function ProtectedRoute({ children }) {
//     // Track whether the user is authorized to access this route
//     const [isAuthorized, setIsAuthorized] = useState(null);

//     // Run the authentication check when the component first loads
//     useEffect(() => {
//         auth().catch(() => setIsAuthorized(false));
//     }, []);

//     // Function to request a new access token using the refresh token
//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get refresh token from local storage
//         try {
//             const res = await api.post("/api/token/refresh/", {
//                 refresh: refreshToken, // Send refresh token to backend
//             });

//             // If refresh is successful, store the new access token and mark as authorized
//             if (res.status === 200) {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access);
//                 setIsAuthorized(true);
//             } else {
//                 setIsAuthorized(false);
//             }
//         } catch (error) {
//             console.log(error);
//             setIsAuthorized(false); // If refreshing fails, mark as unauthorized
//         }
//     };

//     // Function to check if the current access token is still valid
//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN); // Get access token from local storage
//         if (!token) {
//             setIsAuthorized(false); // No token means not authorized
//             return;
//         }

//         // Decode token to check expiration
//         const decoded = jwtDecode(token);
//         const tokenExpiration = decoded.exp;
//         const now = Date.now() / 1000; // Current time in seconds

//         // If expired, try refreshing it; otherwise, mark as authorized
//         if (tokenExpiration < now) {
//             await refreshToken();
//         } else {
//             setIsAuthorized(true);
//         }
//     };

//     // While checking authorization, show a loading message
//     if (isAuthorized === null) {
//         return <div>Loading...</div>;
//     }

//     // If authorized, show the protected content; if not, redirect to login
//     return isAuthorized ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;


/** ---------- NEW ---------- */
import { authApi } from "../api";
function ProtectedRoute({ children }) {
    // Track whether the user is authorized to access this route
    const [isAuthorized, setIsAuthorized] = useState(null);

    // Run the authentication check when the component first loads
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    // Function to request a new access token using the refresh token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get refresh token from local storage
        try {
            const res = await authApi.post("/api/token/refresh/", {
                refresh: refreshToken, // Send refresh token to backend
            });

            // If refresh is successful, store the new access token and mark as authorized
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false); // If refreshing fails, mark as unauthorized
        }
    };

    // Function to check if the current access token is still valid
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN); // Get access token from local storage
        if (!token) {
            setIsAuthorized(false); // No token means not authorized
            return;
        }

        // Decode token to check expiration
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // Current time in seconds

        // If expired, try refreshing it; otherwise, mark as authorized
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    // While checking authorization, show a loading message
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If authorized, show the protected content; if not, redirect to login
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

