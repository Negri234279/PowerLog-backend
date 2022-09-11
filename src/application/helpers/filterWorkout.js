import { FILTERS_OPTION } from '../constants/workoutDateFilterOption.js'

export const filterWorkout = (data, filterBy) => {
    const getFirstDayOfWeek = () => {
        const date = new Date()
        const day = date.getDay()

        const diff = date.getDate() - day + (day === 0 ? -6 : 1)

        return new Date(date.setDate(diff))
    }

    const getLastDayOfWeek = () => {
        const firstDay = getFirstDayOfWeek()

        const lastDay = new Date(firstDay)
        return lastDay.setDate(lastDay.getDate() + 6)
    }

    const datesIsSameDay = (firstDate, secondDate) =>
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate();

    switch (filterBy) {
        case FILTERS_OPTION.DEFAULT:
            const firstDay = getFirstDayOfWeek()
            const startDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())
            const endDay = getLastDayOfWeek()

            return data.filter((a) => {
                const date = new Date(a.date)

                return date >= new Date(startDate) && date <= new Date(endDay)
            })

        case FILTERS_OPTION.DAY:
            const day = new Date()

            return data.filter((a) => {
                return datesIsSameDay(new Date(a.date), new Date(day))
            })

        default:
            return data
    }
}