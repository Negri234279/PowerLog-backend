import CardWorkout from "./CardWorkout"

const WorkoutListRows = ({ workouts }) => {
    if (!workouts.length) return <p> Sin ejercicios </p>

    return workouts.map((workouts, index) => (
        <CardWorkout key={index} {...workouts} />
    ))
}

export default WorkoutListRows