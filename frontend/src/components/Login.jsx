import {  useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../config'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const theme = createTheme()

const toastError = (msg) => toast.error(msg)
//const toastSuccess = (msg) => toast.success(msg)

const Login = () => {

    const title = 'Workouts form'
    useTitle({ title })

    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [credential, setCredential] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => setCredential({ ...credential, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential),
            })

            const parseRes = await response.json()

            //console.log(parseRes)

            if (parseRes.jwtToken) {
                localStorage.setItem('jwtToken', parseRes.jwtToken)
                setAuth({ isAuthenticated: true, token: parseRes.jwtToken })
                navigate('/')
            } else {
                toastError(parseRes)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            label="Recuérdame"
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? (
                                <CircularProgress color="inherit" size={25} />
                            ) : (
                                'Iniciar sesión'
                            )}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    ¿Se te olvidó tu <br /> contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    ¿No tienes una cuenta? <br /> Registrate
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login