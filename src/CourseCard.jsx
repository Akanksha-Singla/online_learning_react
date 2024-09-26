import React from 'react'
import './course.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const CourseCard = ({course,deleteCard}) => {
const[isExpand,setisExpand] = useState(false)
const readMore =()=> setisExpand(!isExpand)
const userName = useSelector((state)=>state.user.value)
console.log(course)

  return (

    <div className='courseCard'>
   <div> <img src={course.img ? course.img : "../src/assets/Forensic-Course.jpeg" } alt="image"></img>
   </div>
    <div className='courseDetails'>
    <ul>
    <li><span>{course.CourseName}</span> </li>
   <li><span>Description:</span> {course.Description}</li>
   <button onClick={readMore}>{isExpand? "Show Less...":"Show More..."}</button> 
   {
    isExpand && (
        <>
        <li><span>Course Id:</span> {course.CourseID}</li>
        <li><span>InstructorID:</span> {course.InstructorID}</li>
        <li><span>Price:</span> {course.Price}</li>
        <li><span>Discount:</span> {course.Discount}</li>
        <li><span>Duration:</span> {course.Duration}</li>
        </>
       
    ) }
 
    </ul>
    <hr></hr>
    <div className='flex justify-between '>
        {userName!== "" && <Button component={Link} to={`../editCourse/${course.CourseID}`}  variant="contained" color="success" startIcon={<EditIcon></EditIcon>}> Edit</Button>}
        { userName!== "" && <Button   variant="contained" color="error" startIcon={<DeleteIcon></DeleteIcon>} onClick={()=>deleteCard(course.CourseID)} >Delete</Button>}
    </div>
    </div>
   
     </div>
    
  )
}
export default CourseCard

    // CourseID: 101,
    // CourseName: "Data Science Essentials",
    // Description: "Learn the fundamentals of data science, including data manipulation and visualization.",
    // InstructorID: 1,
    // Price: 200,
    // Discount: 20,  // Discount in percentage
    // Duration: "6 weeks",
    // img: "data-science.jpg"