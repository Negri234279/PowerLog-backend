import { API_URL } from "../config"

export const getProfile = async () => {
    const res = await fetch(`${API_URL}/user/profile`, {
        method: 'GET',
        headers: { jwt_token: localStorage.jwtToken },
    })
    const data = await res.json()

    return data
}

export const register = async (credential) => {
    try {
        const res = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: { jwt_token: localStorage.jwtToken },
        })

        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        const { status, data } = error.response

        return {
            status,
            message: data
        }
    }
}

export const login = async (credential)  => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credential),
        })
        
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        const { status, data } = error.response;

        return {
            status,
            message: data
        }
    }
}