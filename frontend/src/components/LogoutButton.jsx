import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}
