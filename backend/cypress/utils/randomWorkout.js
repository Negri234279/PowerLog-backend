import uuid from 'uuid-random'

export const randomWorkout = () => {
    return {
        id: uuid(),
        name: 'DL',
        weight: randomInt(randomInt(200)),
        reps: randomInt(15),
        sets: randomInt(6),
        date: '2020-01-01'
    }
}

export const randomInt = (maxNumber) => Math.floor(Math.random() * maxNumber) + 1

export const randomWorkoutName = () => {
    const array = ['SQLB', 'SQHG', 'BP', 'BP Larsen', 'BP Spotto', 'DL']
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

export const randomDate = () => `2022/01/${randomInt(30)}`