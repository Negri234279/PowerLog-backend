import { createContext, useEffect, useState } from "react"

export const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
}

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(
		() => JSON.parse(localStorage.getItem("auth")) || initialState
	)

	useEffect(() => {
		localStorage.setItem("auth", JSON.stringify(auth))
	}, [auth])	

	return (
		<AuthContext.Provider value={{ ...auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider