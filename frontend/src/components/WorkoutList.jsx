import React from 'react'
import { API_URL } from '../config'
import { useWorkout } from '../hooks/useWorkout'
import CardWorkout from './CardWorkout'

const WorkoutList = () => {
    const { workouts, error, loading } = useWorkout()

    console.log('Error', error)

    if (loading) return <div>Loading...</div>
    if (!workouts.length) return <p> Sin ejercicios </p>

    return workouts
        .filter(
            (a) =>
                (new Date(a.w_date) >= new Date('2022-01-01')) &
                (new Date(a.w_date) <= new Date('2022-12-31'))
        )
        .sort((a, b) => new Date(a.w_date) - new Date(b.w_date))
        .map((workouts, index) => <CardWorkout key={index} {...workouts} />)
}

export default WorkoutList