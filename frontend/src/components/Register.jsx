import { useState } from 'react'
import { Avatar, Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import { toast, ToastContainer } from 'react-toastify'
import useTitle from '../hooks/useTitle'

const toastError = (msg) => toast.error(msg)
const toastSuccess = (msg) => toast.success(msg)

const Register = ({ setAuth }) => {
    const title = 'Workouts form'
    useTitle({ title })

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [credential, setCredential] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => setCredential({ ...credential, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            //const body = { email, password }
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential),
            })

            const parseRes = await response.json()

            if (parseRes.jwtToken) {
                localStorage.setItem('token', parseRes.jwtToken)
                setAuth(true)
                toastSuccess('Logged in Successfully')
                navigate('/')
            } else {
                setAuth(false)
                toastError(parseRes)
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer />
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                value={credential.name}
                                required
                                fullWidth
                                label="name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                value={credential.email}
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={credential.password}
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={25} />
                        ) : (
                            'Registrarse'
                        )}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                ¿Ya tienes una cuenta? Iniciar sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register