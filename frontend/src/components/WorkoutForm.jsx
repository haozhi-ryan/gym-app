import { useState, useEffect } from "react"
import "../styles/WorkoutForm.css"   

export default function WorkoutForm() {
  const [name, setName] = useState("")
  const [weight, setWeight] = useState("")
  const [sets, setSets] = useState("")
  const [workouts, setWorkouts] = useState([])
  const [day, setDay] = useState("monday")
  const token = localStorage.getItem("access")
  const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

  // Fetch workouts on load
  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("http://127.0.0.1:8002/workouts/", {
        headers: { "Authorization": `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setWorkouts(data)
      }
    }
    fetchWorkouts()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim()) return

    // For adding workouts
    await fetch("http://127.0.0.1:8002/workouts-create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, weight, sets, day }),
    })

    // Fetch updated workouts
    const res = await fetch("http://127.0.0.1:8002/workouts/", {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setWorkouts(data);
    }

    // Clear inputs after adding
    setName("") 
    setWeight("")
    setSets("")
    setDay("monday")
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access");
    await fetch(`http://127.0.0.1:8002/workouts/${id}/delete/`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    // remove from state without refetching
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const grouped = workouts.reduce((acc, w) => {
    const key = (w.day || "").toLowerCase()
    const valid = DAYS.includes(key) ? key : "unscheduled"
    acc[valid] = acc[valid] || []
    acc[valid].push(w)
    return acc
  }, {})

  return  (
    <div>
      <form className="add-workout-form" onSubmit={handleSubmit}>
        <div className="workout-info">
          <label>
            Exercise name:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Weight (kg):
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
          <label>
            Sets:
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
          </label>
          <label>
            Day of the week:
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {DAYS.map(d => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
        <button 
          type="submit"
          className="add-btn"
        >
          Add</button>
      </form>

      <div className="workout-section">
          {DAYS.map(d => (
          <section key={d} className="day-section">
            <h3>{d.charAt(0).toUpperCase()+d.slice(1)}</h3>
            <ul className="workout-list">
              {(grouped[d] || []).map(w => (
                <li key={w.id}>
                  <div>
                    <span>{w.name}</span>
                    <span> {w.weight}kg × {w.sets} sets</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(w.id)}>✕</button>
                </li>
              ))}
              {!(grouped[d] || []).length && <li className="empty">No workouts</li>}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}