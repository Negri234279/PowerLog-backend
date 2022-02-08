import { useEffect, useState } from 'react'
import { API_URL } from '../config'

const Profile = () => {
    const [profile, setProfile] = useState(null)

    const loadProfile = async () => {
        const res = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: { jwt_token: localStorage.jwtToken },
        })
        const data = await res.json()
        setProfile(data)
    }

    useEffect(() => {
        loadProfile()
    }, [])

    console.log(profile)
    console.table(profile)

    return (
        <div>
            <h1>Mi perfil</h1>
            <p> Name: {profile?.name ?? 'xx'} </p>
            <p> Emai: {profile?.email ?? 'xxx@xxx.com'} </p>
        </div>
    )
}

export default Profile