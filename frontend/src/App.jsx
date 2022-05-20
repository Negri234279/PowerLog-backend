import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import CalcDisc from './pages/CalcDisc'
import Aproximation from './pages/Aproximation'
import TaskForm from './components/TaskForm'
import NoMatch from './components/NoMatch'
import Workout from './pages/Workout'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import AuthProvider from './context/AuthContext'

const App = () => {

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/calc" element={<CalcDisc />} />
                        <Route path="/aprox" element={<Aproximation />} />
                        <Route path="*" element={<NoMatch />} />

                        {/* Privates routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/calc/:id" element={<CalcDisc />} />
                            <Route path="/workout" element={<Workout />} />
                            <Route
                                path="/:idUser/workout"
                                element={<Workout />}
                            />
                            <Route path="/workout/new" element={<TaskForm />} />
                            <Route
                                path="/workout/:id/edit"
                                element={<TaskForm />}
                            />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App