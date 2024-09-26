import React from "react";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./form.css";
import { login } from "./model/userModel";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
// import Cookies 
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';

const initialValues = { email:"", password:""};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password:Yup.string().required("Required"),
  // confirmPassword:Yup.string().required("Required!")
});



const SignUpForm = () => {
  const navigate=useNavigate();
  const [errorMessage, setErrorMessage]=useState(false);
  const dispatch=useDispatch();


  const onSubmit = (values) => {
    // console.log("values",values)
    const {email,password} = values
    console.log(email,password)
    
  const res=login(email,password)
  if(res) {
    setErrorMessage("");
    const expiryDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const cookie=new Cookies("", { path: '/',expires:expiryDate});
    cookie.set("user", email)
    dispatch(setUser(email))
    window.alert("You are logged in sucessfully...")
    navigate('/home');
  }
  else
    setErrorMessage(true)
  };
  return (
    <>
  
{  errorMessage &&   <Alert  severity="error">
       Inccorect username or password
</Alert>}
    <div className="formContainer">
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
         
            <div>
            <h1 className="text-[var(--clr-brown)] font-bold">Sign up form</h1> 
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" className="formInput" />
              <ErrorMessage name="email" component="div" className="error" />
        </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="formInput" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {/* <div>
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <Field name="confirmPassword" type="text" className="formInput" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div> */}
                <div>
                    <small className="text-danger">{errorMessage}</small>
                </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-success"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default SignUpForm;

//The <Field> component by default will render an <input>

// component that, given a name prop, will implicitly grab the respective onChange,
// onBlur, value props and pass them to the element as well as any props you pass
// to it. However, since not everything is an input, <Field> also accepts a
//     few other props to let you render whatever you want.

// <input className="form-input" placeHolder="Jane"  />
{
  /* <Field name="firstName" className="form-input" placeholder="Jane" />

// <textarea className="form-textarea"/></textarea>
<Field name="message" as="textarea" className="form-textarea" />

// <select className="my-select"/>
<Field name="colors" as="select" className="my-select">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field> */
}
