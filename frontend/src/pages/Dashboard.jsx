import { useEffect, useState } from 'react'

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState('')
    const [allTodos, setAllTodos] = useState([])
    const [todosChange, setTodosChange] = useState(false)

    const getProfile = async () => {
        try {
            const res = await fetch('http://localhost:5000/dashboard/', {
                method: 'GET',
                headers: { jwt_token: localStorage.token },
            })

            const parseData = await res.json()

            setAllTodos(parseData)

            setName(parseData[0].user_name) // name is the first array item
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        try {
            localStorage.removeItem('token')
            setAuth(false)
            console.log('Successfully logged out');
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProfile()
        setTodosChange(false)
    }, [todosChange])

    return (
        <div>
            <div className="d-flex mt-5 justify-content-around">
                <h2>{name} 's Todo List</h2>
                <button onClick={(e) => logout(e)} className="btn btn-primary">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard
