import { FILTERS_OPTION } from '../constants/workoutDateFilterOption.js'

export const filterWorkout = (data, filterBy) => {
    switch (filterBy) {
        case FILTERS_OPTION.DEFAULT:
            const firstDayWeek = getFirstDayOfWeek()
            const lastDayWeek = getLastDayOfWeek()

            return data.filter((a) => {
                const date = new Date(a.date)

                return compareDate(date, firstDayWeek, lastDayWeek)
            })

        case FILTERS_OPTION.MONTH:
            const firstDayMonth = getFirstDayOfMonth()
            const lastDayMonth = getLastDayOfMonth()

            return data.filter((a) => {
                const date = new Date(a.date)

                return compareDate(date, firstDayMonth, lastDayMonth)
            })

        case FILTERS_OPTION.DAY:
            return data.filter((a) => {
                const date = new Date(a.date)

                return datesIsSameDay(date, new Date())
            })

        default:
            return data
    }
}

const compareDate = (date, firstDate, secondDate) =>
    date >= firstDate && date <= secondDate

const getFirstDayOfMonth = () => {
    const actualMonth = new Date()

    return new Date(actualMonth.getFullYear(), actualMonth.getMonth(), 1)
}

const getLastDayOfMonth = () => {
    const actualMonth = new Date()

    return new Date(actualMonth.getFullYear(), actualMonth.getMonth() + 1, 0)
}

const getFirstDayOfWeek = () => {
    const actualDate = new Date()
    const day = actualDate.getDay()
    const diff = actualDate.getDate() - day + (day === 0 ? -6 : 1)
    const firstDay = new Date(actualDate.setDate(diff))

    return new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())
}

const getLastDayOfWeek = () => {
    const firstDay = getFirstDayOfWeek()
    const lastDay = new Date(firstDay)

    return lastDay.setDate(lastDay.getDate() + 6)
}

const datesIsSameDay = (firstDate, secondDate) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()