import { workoutApi } from "../api";
import { useState } from "react"

export default function WorkoutForm() {
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    await fetch("http://127.0.0.1:8002/workouts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    setName("") // clear input after adding
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Workout name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workout name"
        />
      </label>
      <button type="submit">Add</button>
    </form>
  )
}