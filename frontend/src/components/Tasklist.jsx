import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Container, Typography } from "@mui/material"
import { ip_backend } from '../config';

const Tasklist = () => {

	const [tasks, setTasks] = useState([])
	const navigate = useNavigate()

	const loadTasks = async () => {
		const res = await fetch(`http://${ip_backend}/tasks`)
		const data = await res.json()
		setTasks(data)
	}

	useEffect(() => { loadTasks() }, [])

	const handleDelete = async (id) => {
		await fetch(`http://${ip_backend}/tasks/${id}`, {
            method: 'DELETE',
        })
		setTasks(tasks.filter(task => task.id !== id))
	}

	return (
        <Container sx={{ mt: 3 }}>
            <Typography variant='h4' textAlign='center' sx={{ mt: 2 }}> Task list </Typography>
            {tasks.map((task, index) => (
                <Card key={index} style={{ marginBottom: '.7rem', backgroundColor: '#1e272e' }}>
                    <CardContent style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{ color: 'white' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
                            <Typography>{task.description}</Typography>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => handleDelete(task.id)}
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