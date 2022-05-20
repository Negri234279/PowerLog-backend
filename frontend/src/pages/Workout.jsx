import { Link } from 'react-router-dom'
import { Button, Container, Typography } from "@mui/material"
import AddBox from '@mui/icons-material/AddBox'
import WorkoutList from '../components/WorkoutList';

const Workout = () => {

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

            <WorkoutList />
        </Container>
    )
}

export default Workout