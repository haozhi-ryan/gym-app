import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="home-page">
      <h2>This is the home page</h2>
      <LogoutButton />
    </div>
  );
}

export default Home;
