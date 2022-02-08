import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { API_URL } from '../config'
import useTitle from '../hooks/useTitle'

const TaskForm = () => {

    const title = 'Workouts form'
    useTitle({ title })

    const navigate = useNavigate()
    const params = useParams()
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const [workouts, setWorkouts] = useState({
        workout: '',
        w_weight: '',
        w_reps: '',
        w_sets: '',
        w_date: '2022-01-01'
    })

    //const fecha = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    //console.log(fecha.toLocaleDateString('es-ES', options))

    const handleChange = (e) => setWorkouts({ ...workouts, [e.target.name]: e.target.value })

    useEffect(() => {
        if (params.id) loadTask(params.id)
    }, [params.id])

    const loadTask = async (id) => {
        const res = await fetch(`${API_URL}/workout/update/${id}`, {
            method: 'GET',
            headers: { jwt_token: localStorage.jwtToken },
        })
        const data = await res.json()
        //console.table(data)
        setWorkouts({ workout: data.workout, w_weight: data.w_weight, w_reps: data.w_reps, w_sets: data.w_sets, w_date: data.w_date })
        setEdit(true)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            if (edit) {
                await fetch(`${API_URL}/workout/${params.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        jwt_token: localStorage.jwtToken,
                    },
                    body: JSON.stringify(workouts),
                })
            } else {
                await fetch(`${API_URL}/workout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        jwt_token: localStorage.jwtToken,
                    },
                    body: JSON.stringify(workouts),
                })
            }
        } catch (error) {
            console.error(error)
        }
 
        setLoading(false)
        navigate('/workout')
    }
    
    return (
        <Grid container alignItems="center" direction="column" justifyContent="center">
            <Grid item xs={4}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1E272E', padding: '1rem' }}>
                    <Typography variant="h5" textAlign="center" color="white">
                        {edit ? 'Actualizar ejercicio' : 'Crear ejercicio'}
                    </Typography>
                    <CardContent>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            {/* EJERCICIO */}
                            <TextField
                                variant="filled"
                                label="Titulo ejercicio"
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                name="workout"
                                value={workouts.workout}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            {/* FECHA */}
                            <TextField
                                type="date"
                                label="Fecha"
                                name="w_date"
                                value={workouts.w_date}
                                onChange={handleChange}
                                variant="filled"
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            {/* PESO */}
                            <TextField
                                type='number'
                                variant="filled"
                                label="Peso"
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                name="w_weight"
                                value={workouts.w_weight}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            {/* REPETICIONES */}
                            <TextField
                                type='number'
                                variant="filled"
                                label="Repeticiones"
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                name="w_reps"
                                onChange={handleChange}
                                value={workouts.w_reps}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            {/* SERIES */}
                            <TextField
                                type='number'
                                variant="filled"
                                label="Series"
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                name="w_sets"
                                onChange={handleChange}
                                value={workouts.w_sets}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <Button type="submit" variant="contained" color="primary">
                                { loading ? <CircularProgress color="inherit" size={25} /> : 'Save' }
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TaskForm