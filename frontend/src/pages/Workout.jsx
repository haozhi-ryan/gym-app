import WorkoutForm from "../components/WorkoutForm";
import "../styles/Workout.css"   

function Workout() {
  return (
    <div className="workout-page-container">
      <div className="title-description-container">
        <h1>Your workouts</h1>
        <p>
          The Workout page allows users to log their exercises by entering details such as workout name, weight, and sets.
        </p>
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Workout;