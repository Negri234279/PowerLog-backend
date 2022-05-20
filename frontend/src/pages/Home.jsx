import { Button, Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext, initialState } from "../context/AuthContext"

const logout = (setAuth) => {
    localStorage.removeItem('jwtToken')
    setAuth(initialState)
}

const Home = () => {

    const { isAuthenticated, setAuth } = useContext(AuthContext)

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
                {!isAuthenticated
                    ? <Button
                        to="/login"
                        component={Link}
                        variant="contained"
                        sx={{ display: 'block', margin: '1rem 0' }}>
                            Iniciar sesion
                        </Button>
                    : <Button
                        onClick={() => logout(setAuth)}
                        sx={{ display: 'block', margin: '1rem 0' }}>
                            Cerrar sesion
                        </Button>
                }

                {/*<Profile />*/}

                <Button
                    to="/profile"
                    component={Link}
                >
                    Perfil
                </Button>
            </Grid>
        </div>
    )
}

export default Home