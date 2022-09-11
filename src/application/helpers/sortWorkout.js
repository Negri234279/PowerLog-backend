import { SORT_OPTION } from '../constants/workoutSortOption.js'

const sortDataDefault = (data) => {
    return data.sort((a, b) => {
        if (a.date.getTime() > b.date.getTime()) return 1
        else if (a.date.getTime() < b.date.getTime()) return -1
        else if (a.date.getTime() === b.date.getTime()) {
            if (a.name.includes('SQ')) return -1
            else if (a.name.includes('BP') & b.name.includes('DL')) return -1
            else if (a.name < b.name) return 1
            else return 0
        }
        else return 0
    })
}

export const sortWorkout = (data, sortBy) => {
    const workouts = sortDataDefault(data)

    switch (sortBy) {
        case SORT_OPTION.DATE_DESC:
            return workouts.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )

        default:
            return workouts
    }
}