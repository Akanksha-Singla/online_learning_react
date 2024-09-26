import React from 'react'
import { useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser,resetUser } from './redux/userSlice'
import Cookies from 'universal-cookie'
import { useDispatch } from 'react-redux'


const Navbar = () => {
    const dispatch = useDispatch()
    const userName = useSelector((state)=>state.user.value)
    console.log("value:",userName)
    const navigate = useNavigate()
    const handleClick =(e)=>{
        if(userName === ""){

            e.preventDefault()
            window.alert("Please loggin first")
            navigate("./adminLogin")

        }
    // else{
    //     console.log("user",userName)
    // }

    }
    const cookie = new Cookies()
    function logout(){
        cookie.remove("user");
        dispatch(resetUser());
        window.alert("Logout Successfully....")
        navigate('/adminLogin')
      }
      useEffect(()=>{
    
        const uname=cookie.get('user')
        if(uname!==undefined)
          dispatch(setUser(uname))
      })

  return (
    <nav>
        <ul className='navbar'>
            <li>
                <Link to='home'>Home</Link>
            </li>
            <li>
                <Link to='courses'>All Courses</Link>
            </li>
            <li>
                <Link  to='addCourse' style={{
            pointerEvents:(userName=="")?"none":"auto",
          }} >Add Course</Link>
            </li>
            <li>
              {  userName ===""&& <Link to="adminLogin"> Admin Login</Link>}
            </li>
            
            <li>
              { userName !== "" && <Link to="/" onClick={logout}> Logout</Link>}
            </li>
            <li className='user'> <b>{userName}</b></li>
            </ul>


    </nav>
  )
}

export default Navbar