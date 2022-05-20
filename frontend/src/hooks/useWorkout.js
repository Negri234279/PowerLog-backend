import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export const useWorkout = () => {
	const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
	const [workouts, setWorkouts] = useState([])

	useEffect(() => {
		(
			async function () {
				try {
					setLoading(true)
					const response = await axios.get(`${API_URL}/workout`, {
						headers: { jwt_token: localStorage.jwtToken },
					})
					setWorkouts(response.data)
				} catch (error) {
					setError(error)
				} finally {
					setLoading(false)
				}
			}
		)()
	}, [])

	return { error, loading, workouts }
}

/* 
useEffect(() => {

		setLoading(true)
		fetch(url, {
			method: 'GET',
			headers: { jwt_token: localStorage.jwtToken },
		})
			.then(response => response.json())
			.then(workouts => setWorkouts(workouts))
			.catch(error => setError(error))
			.finally(() => setLoading(false))

	}, [url])
*/
/*
(
			async function () {
				try {
					setLoading(true)
					const response = await axios.get(url, {
						method: 'GET',
						headers: { jwt_token: localStorage.jwtToken },
					})
					setWorkouts(response.data)
				} catch (error) {
					setError(error)
				} finally {
					setLoading(false)
				}
			}
		)()
*/