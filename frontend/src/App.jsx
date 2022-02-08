import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import CalcDisc from './pages/CalcDisc'
import Aproximation from './pages/Aproximation'
import TaskList from './components/Tasklist'
import TaskForm from './components/TaskForm'
import NoMatch from './components/NoMatch'

const App = () => {

    return (
        <Fragment>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login  />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/workout" element={<TaskList />} />
                        <Route path="/:idUser/workout" element={<TaskList />} />
                        <Route path="/workout/new" element={<TaskForm />} />
                        <Route path="/workout/:id/edit" element={<TaskForm />} />
                        <Route path="/calc" element={<CalcDisc />} />
                        <Route path="/aprox" element={<Aproximation />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </BrowserRouter>
        </Fragment>
    )
}

export default App