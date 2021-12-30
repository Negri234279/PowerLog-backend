import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home"
import CalcDisc from './pages/CalcDisc'
import Aproximation from './pages/Aproximation'
import TaskList from './components/Tasklist'
import TaskForm from './components/TaskForm'
import NoMatch from './components/NoMatch'

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/task" element={<TaskList />} />
                  <Route path="/task/new" element={<TaskForm />} />
                  <Route path="/tasks/:id/edit" element={<TaskForm />} />
                  <Route path="/calc" element={<CalcDisc />} />
                  <Route path="/aprox" element={<Aproximation />} />
                  <Route path="*" element={<NoMatch />} />
              </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App