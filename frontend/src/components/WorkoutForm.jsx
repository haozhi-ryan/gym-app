import { useState, useEffect } from "react"
import "../styles/WorkoutForm.css"   

export default function WorkoutForm() {
  const [name, setName] = useState("")
  const [weight, setWeight] = useState("")
  const [sets, setSets] = useState("")
  const [workouts, setWorkouts] = useState([])

  const token = localStorage.getItem("access")


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

    

    // For testing GET method
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      const data = await response.json();
      console.log("User:", data.username);
      console.log("User ID:", data.id);
      console.log("User email:", data.email);
      // setUsername(data.username)
    } catch (error) {
      console.error("Error fetching username:", error);
    }

    if (!name.trim()) return

    // For adding workouts
    await fetch("http://127.0.0.1:8002/workouts-create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, weight, sets }),
    })

    setName("") // clear input after adding
    setWeight("")
    setSets("")
  }

  return  (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Workout name:
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
        <button type="submit">Add</button>
      </form>
      <h3>Your Workouts</h3>
        <ul>
          {workouts.map((w) => (
            <li key={w.id}>
              {w.name} – {w.weight} kg × {w.sets} sets
            </li>
          ))}
      </ul>
    </div>
  )
}