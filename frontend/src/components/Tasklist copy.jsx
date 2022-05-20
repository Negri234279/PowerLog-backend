import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Container, Typography } from "@mui/material"
import { API_URL } from '../config';
import AddBox from '@mui/icons-material/AddBox'
import useTitle from '../hooks/useTitle';

const Tasklist = () => {

    const title = 'Workouts list'
    useTitle({title})

	const [workouts, setWorkout] = useState([])
	const navigate = useNavigate()

	const loadTasks = async () => {
        const res = await fetch(`${API_URL}/workout`, {
            method: 'GET',
            headers: { jwt_token: localStorage.jwtToken }
        })
        const data = await res.json()
        setWorkout(data)
    }

	useEffect(() => { loadTasks() }, [])

	const handleDelete = async (id_workouts) => {
		try {
            await fetch(`${API_URL}/workout/${id_workouts}`, {
                method: 'DELETE',
                headers: { jwt_token: localStorage.jwtToken }
            })
            setWorkout(workouts.filter((workouts) => workouts.id_workouts !== id_workouts))
        } catch (error) {
            throw error
        }
	}
    
    const formatDate = (x) => `${x.slice(8, 10)}-${x.slice(5, 7)}-${x.slice(0, 4)}`
 
	return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h4" textAlign="center" sx={{ mt: 2 }}>
                Workout list
            </Typography>
            <Button
                variant="contained"
                to="/workout/new"
                component={Link}
                startIcon={<AddBox />}
                style={{ margin: '.75rem 0' }}
            >
                Crear Workout
            </Button>
            {workouts
                .filter(
                    (a) =>
                        (new Date(a.w_date) >= new Date('2022-01-07')) &
                        (new Date(a.w_date) <= new Date('2022-01-14'))
                )
                .sort((a, b) => new Date(a.w_date) - new Date(b.w_date))
                .map((workouts, index) => (
                    <Card
                        key={index}
                        style={{
                            marginBottom: '.7rem',
                            backgroundColor: '#1e272e',
                        }}
                    >
                        <CardContent
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ color: 'white' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {workouts.workout}
                                </Typography>
                                <Typography>
                                    {formatDate(workouts.w_date)}
                                </Typography>
                                <Typography>
                                    {workouts.w_sets}x{workouts.w_reps}x
                                    {workouts.w_weight}
                                </Typography>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={() =>
                                        navigate(
                                            `/workout/${workouts.id_workouts}/edit`
                                        )
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() =>
                                        handleDelete(workouts.id_workouts)
                                    }
                                    style={{ marginLeft: '.5rem' }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </Container>
    )
};

export default Tasklist