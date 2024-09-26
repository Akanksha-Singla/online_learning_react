
// import './App.css'
import Course from './Course'
import CourseInputForm from './CourseInputForm'
import Navbar from './Navbar'
import SignUpForm from './SignUpForm'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
   <>
   <Navbar></Navbar>
    <Outlet/>
   </>
  )
}

export default App
