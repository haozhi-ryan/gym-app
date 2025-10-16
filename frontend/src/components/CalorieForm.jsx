import { useState } from "react";
import "../styles/CalorieForm.css"
import { calorieCalcApi } from "../api";

export default function CalorieForm() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState("sedentary");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("");
    setResult(null);

    try {
      // Send POST request to the service
      const res = await calorieCalcApi.post("/calculate", {
        sex,
        weightKg: Number(weight),
        heightCm: Number(height),
        age: Number(age),
        activity
      })

      // Get the data
      const data = res.data;

      setResult({
        bmr: data.bmr,
        maintenance: data.maintenance,
        mildLoss: data.mildLoss,
        loss: data.loss,
        extremeLoss: data.extremeLoss,
      });

    } catch (error) {
      console.log(e.response?.data);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "24px auto", padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 12 }}>Calorie Estimator</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        {/* Sex */}
        <div>
          <h4 className="secondary-title">Sex</h4>
          <div style={{ display: "flex", gap: 16 }}>
            <div>
              <label>
                <input type="radio" value="male" checked={sex === "male"} onChange={(e) => setSex(e.target.value)} /> Male
              </label>
              <label>
                <input type="radio" value="female" checked={sex === "female"} onChange={(e) => setSex(e.target.value)} /> Female
              </label>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <h4 className="secondary-title">Weight (kg)</h4>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </div>

        {/* Height */}
        <div>
          <h4 className="secondary-title">Height (cm)</h4>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </div>

        {/* Age */}
        <div>
          <h4 className="secondary-title">Age (years)</h4>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </div>

        {/* Activity */}
        <div>
          <h4 className="activity-level-title">Activity Level</h4>
          <div className="activity-levels" style={{ display: "grid", gap: 6 }}>
            {[
              ["sedentary", "Sedentary (little or no exercise)"],
              ["light", "Light (exercise 1–3 times/week)"],
              ["moderate", "Moderate (4–5 times/week)"],
              ["active", "Active (daily exercise or intense 3–4 times/week)"],
              ["very_active", "Very Active (intense exercise 6–7 times/week)"],
              ["extra_active", "Extra Active (very intense daily or physically demanding job)"],
            ].map(([val, label]) => (
              <div className="activity-level" key={val}>
                <span key={val}>
                  {label}
                </span>
                  <input
                    type="radio"
                    name="activity"
                    value={val}
                    checked={activity === val}
                    onChange={(e) => setActivity(e.target.value)}
                  />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#111827",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Calculate
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 16, padding: 12, background: "#f9fafb", borderRadius: 10 }}>
          <p><strong>BMR:</strong> {result.bmr} kcal/day</p>
          <p><strong>Maintenance:</strong> {result.maintenance} kcal/day</p>
          <p><strong>Mild Weight Loss (−0.25 kg/week):</strong> {result.mildLoss} kcal/day</p>
          <p><strong>Weight Loss (−0.5 kg/week):</strong> {result.loss} kcal/day</p>
          <p><strong>Extreme Weight Loss (−1 kg/week):</strong> {result.extremeLoss} kcal/day</p>
        </div>
      )}
    </div>
  );
}
