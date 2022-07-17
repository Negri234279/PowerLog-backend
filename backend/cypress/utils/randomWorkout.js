import uuid from 'uuid-random'

export const randomWorkout = () => {
    return {
        id: uuid(),
        name: 'SQLB',
        weight: 110,
        reps: 10,
        sets: 4,
        date: '01/01/2022',
        idUser: '0f476be6-b0cf-4984-90e7-ad2d7041cf0a'
    }
}