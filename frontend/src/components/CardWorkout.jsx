import { Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CardWorkout = ({ workout, w_date, w_sets, w_reps, w_weight, id_workouts }) => {
    const navigate = useNavigate()
    
    const date = new Date(w_date)

    return (
        <Card
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
                        {workout}
                    </Typography>
                    <Typography>
                        {date.toLocaleString('es-ES', { dateStyle: 'short' })}
                    </Typography>
                    <Typography>
                        {w_sets}x{w_reps}x{w_weight}
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate(`/calc/${w_weight}`)}
                    >
                        Calc
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate(`/workout/${id_workouts}/edit`)}
                        style={{ marginLeft: '.5rem' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        //onClick={() => handleDelete(workouts.id_workouts)}
                        style={{ marginLeft: '.5rem' }}
                    >
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardWorkout