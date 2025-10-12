import { useState } from "react";
import "../styles/CalorieForm.css"

export default function CalorieForm() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState("sedentary");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.465,
    active: 1.725,
    very_active: 1.9,
    extra_active: 2.0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const W = parseFloat(weight);
    const H = parseFloat(height);
    const A = parseFloat(age);

    if (!W || !H || !A) {
      setError("Please enter valid values for weight, height, and age.");
      return;
    }

    const base = 10 * W + 6.25 * H - 5 * A;
    const bmr = sex === "male" ? base + 5 : base - 161;
    const factor = activityFactors[activity];
    const maintenance = bmr * factor;

    const mildLoss = maintenance * 0.9;   // 0.25kg/week
    const loss = maintenance * 0.8;       // 0.5kg/week
    const extremeLoss = maintenance * 0.6; // 1kg/week

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      mildLoss: Math.round(mildLoss),
      loss: Math.round(loss),
      extremeLoss: Math.round(extremeLoss),
    });
  };

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
          <div class="activity-levels" style={{ display: "grid", gap: 6 }}>
            {[
              ["sedentary", "Sedentary (little or no exercise)"],
              ["light", "Light (exercise 1–3 times/week)"],
              ["moderate", "Moderate (4–5 times/week)"],
              ["active", "Active (daily exercise or intense 3–4 times/week)"],
              ["very_active", "Very Active (intense exercise 6–7 times/week)"],
              ["extra_active", "Extra Active (very intense daily or physically demanding job)"],
            ].map(([val, label]) => (
              <div class="activity-level">
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
          <p><strong>Maintenance (TDEE):</strong> {result.maintenance} kcal/day</p>
          <p><strong>Mild Weight Loss (−0.25 kg/week):</strong> {result.mildLoss} kcal/day</p>
          <p><strong>Weight Loss (−0.5 kg/week):</strong> {result.loss} kcal/day</p>
          <p><strong>Extreme Weight Loss (−1 kg/week):</strong> {result.extremeLoss} kcal/day</p>
        </div>
      )}
    </div>
  );
}
