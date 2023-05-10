import { filterWorkout } from '../helpers/filterWorkout.js'
import { paginateWorkouts } from '../helpers/paginateWorkouts.js'
import { sortWorkout } from '../helpers/sortWorkout.js'

export const useFilters = (workouts, filters) => {
    const workoutFiltered = filterWorkout(workouts, filters.filterBy)

    const workoutSorted = sortWorkout(workoutFiltered, filters.sortBy)

    const paginatedWorkouts = paginateWorkouts(workoutSorted, filters.page, filters.limit)

    return {
        count: workoutSorted.length,
        data: paginatedWorkouts,
    }
}