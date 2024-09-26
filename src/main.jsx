import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider,redirect} from 'react-router-dom';
import Course from './Course.jsx';
import CourseInputForm from './CourseInputForm.jsx';
import Home from './Home.jsx';
import { getCourseById, gettAllCourse } from './apis/courseApi.jsx';
import SignUpForm from './SignUpForm.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';





const childRoutes=[

  {
    path:"/",
    loader:()=>redirect('home') 
},
    {
        path:'courses',
        element:<Course/>,
        loader:async()=>{
          return await gettAllCourse()
        }
        
    },
    {
        path:'addCourse',
        element:<CourseInputForm/>
    },
    {
        path:'editCourse/:_id', 
        // it will hold router parameter
        element:<CourseInputForm/>,
        loader:async ({params})=>{
     
 return await getCourseById(params._id);
           }
    },
    {
        path:'adminLogin',
        element:<SignUpForm/>
    },
    {
        path:'home',
        element:<Home/>
    }
   ]
const rootRoutes=[
  {
      path:'/',
      element:<App/>,
      children:childRoutes
  }
]
const courseRouter = createBrowserRouter(rootRoutes)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={courseRouter}></RouterProvider>
  </Provider>,
)
//  this mail is regarding telephonic conversation to
//  resolve the miscommunication if any:
//  I am looking for a job in corporate
// i make sure that i will be with the company for along time
//  i  bold was tring for a govt job in 2021 for 1 year only
//  
// but now i want to make my career in corporate bold only
// 