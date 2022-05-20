import { useState } from 'react'

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async(email, password) => {
        try {
            setLoading(true)            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential),
            })

            const parseRes = await response.json()

            console.log(parseRes)

            if (parseRes.jwtToken) {
                localStorage.setItem('jwtToken', parseRes.jwtToken)
                navigate('/')
            } else {
                toastError(parseRes)
            }
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }



  return (
    <div>useAuth</div>
  )
}