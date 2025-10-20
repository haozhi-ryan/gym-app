import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "../styles/Home.css";
import "../styles/LogoutButton.css"; // reuse the same button styling

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">Welcome back</h1>
        <p className="home-subtitle">Quick actions</p>

        <div className="button-group">
          <button
            className="logout-btn"
            onClick={() => navigate("/calorie-calculator")}
          >
            Calorie Calculator
          </button>

          <button
            className="logout-btn"
            onClick={() => navigate("/workout")}
          >
            Your Workout
          </button>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
