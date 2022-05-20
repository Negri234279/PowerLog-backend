import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = () => {
    const location = useLocation()

    const { isAuthenticated, loading } = useContext(AuthContext)

    if (loading) return <h3>Loading...</h3>

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute