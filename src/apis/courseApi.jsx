import axios from "axios";

const url ="http://localhost:3000/"

export  async function addCourse(course){
   
 const response =  await axios.post(url+'course/add',course)
console.log(response.data)
 return response.data
}

export async function gettAllCourse(){
    const response = await axios.get(url+'courses/getall')
    return response.data
}

export async function updateCourse(course){
    console.log("in update frontend course",course)
    // console.log("FormData entries:");
    // course.forEach((value, key) => {
    //   console.log(key, value);
    // });

    const courseID = course.get('CourseID');
    // const courseID = course.CourseID
    console.log("CourseID to be used:", courseID);
    const response = await axios.put(url+`course/update/${courseID}`,course)
    return response.data
}

export async function deleteById(courseId){
    const response = await axios.delete(url+`courses/delete/${courseId}`)
    return response.data
}

export async function getCourseById(courseId){
   const response = await axios.get(url+`courses/get/${courseId}`)
    return response.data
}

export async function getCourseByName(courseName){
    const response = await axios.get(url+`course/getName/${courseName}`)
    console.log("response by name",response.data);
     return response.data
}