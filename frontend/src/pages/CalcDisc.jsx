import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { usePlates } from '../hooks/usePlates'

const CalcDisc = () => {
    const params = useParams()
    const [workouts, setWorkouts] = useState({
        workout: '',
        w_weight: 0,
        w_reps: '',
        w_sets: '',
        w_date: '',
    })

        //const numPlates = usePlates(params.id)
    const { plate25, plate20, plate15, plate10, plate5, plate2, plate1 } = usePlates(params.id, 20)

    const [plates, setPlates] = useState({
        plate25: plate25 || 0,
        plate20: plate20 || 0,
        plate15: plate15 || 0,
        plate10: plate10 || 0,
        plate5: plate5 || 0,
        plate2: plate2 || 0,
        plate1: plate1 || 0,
    })

    useEffect(() => {
        if (params.id) setWorkouts({ w_weight: params.id })
    }, [params.id])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Calculadora de discos</h1>
            <h3 style={{ textAlign: 'center' }}>{workouts.w_weight || 0} kg</h3>
            {params.id ? <div style={{ textAlign: 'center' }}>
                {plates.plate25 ? <p> D25: {plates.plate25}</p> : ''}
                {plates.plate20 ? <p> D20: {plates.plate20 || 0}</p> : ''}
                {plates.plate15 ? <p> D15: {plates.plate15 || 0}</p> : ''}
                {plates.plate10 ? <p> D10: {plates.plate10 || 0}</p> : ''}
                {plates.plate5 ? <p> D5: {plates.plate5 || 0}</p> : ''}
                {plates.plate2 ? <p> D2.5: {plates.plate2 || 0}</p> : ''}
                {plates.plate1 ? <p> D1.25: {plates.plate1 || 0}</p> : ''}
            </div> : ''}
        </>
    )
}

export default CalcDisc