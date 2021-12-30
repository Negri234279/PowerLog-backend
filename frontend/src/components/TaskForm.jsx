import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { ip_backend } from '../config'

const TaskForm = () => {

    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const [edit, setEdit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        if (edit) {
            const res = await fetch(`http://${ip_backend}/tasks/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(await res.json()) 
        } else {
            await fetch(`http://${ip_backend}/tasks`, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' },
            })
        }
 
        setLoading(false)
        navigate('/task')
    }

    const handleChange = e => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const loadTask = async (id) => {
		const res = await fetch(`http://192.168.0.90:3001/tasks/${id}`)
		const data = await res.json()
        setTask({ title: data.title, description: data.description })
        setEdit(true)
	}
 
    useEffect(() => {
        if (params.id) loadTask(params.id)
    }, [params.id])

    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
        >
            <Grid item xs={4}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: '#1E272E',
                        padding: '1rem',
                    }}
                >
                    <Typography variant="h5" textAlign="center" color="white">
                        {edit ? 'Update Task' : 'Create Task'}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="filled"
                                label="Write your Title"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                name="title"
                                onChange={handleChange}
                                value={task.title}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                variant="filled"
                                label="Write your Description"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                name="description"
                                onChange={handleChange}
                                value={task.description}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={25}
                                    />
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TaskForm