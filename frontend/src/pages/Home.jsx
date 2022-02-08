import { Button, Grid, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import Profile from "../components/Profile"

const Home = () => {

    const initialUsuario = null

    const [usuario, setUsuario] = useState(initialUsuario)

    const logout = () => {
        localStorage.removeItem('jwtToken')
    }

    return (
        <div>
            <Typography variant="h3" textAlign="center">
                Home page
            </Typography>

            <Grid
                container
                alignItems="center"
                direction="column"
                justifyContent="center"
            >
                <Button
                    to="/login"
                    component={Link}
                    variant="contained"
                    sx={{ display: 'block', margin: '1rem 0' }}
                >
                    Iniciar sesion
                </Button>
                {!usuario
                    ? <Button onClick={() => setUsuario(true)}>Iniciar sesion</Button>
                    : <Button onClick={() => setUsuario(null)}>Cerrar sesion</Button>
                }

                <Button onClick={() => logout()}>Cerrar sesion</Button>

                <Profile />
            </Grid>
        </div>
    )
}

export default Home