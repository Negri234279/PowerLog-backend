export const paginateWorkouts = (workouts, page, limit) => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return workouts.slice(startIndex, endIndex)
}
