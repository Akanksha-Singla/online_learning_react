import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./form.css";
import { addCourse, updateCourse } from "./apis/courseApi";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation, useLoaderData } from "react-router-dom";

const CourseInputForm = () => {
  const location = useLocation();
  const data = useLoaderData();
  const { _id } = useParams();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [toggle,setToggle]= useState(false)

  const [initialValues, setInitialValues] = useState({
    CourseID: 0,
    CourseName: "",
    Description: "",
    InstructorID: 1,
    Price: 200,
    Discount: 20,
    Duration: "",
    img: null// This will hold the uploaded file
  });


  useEffect(() => {
    if (data) {
      setInitialValues({
        CourseID: data.CourseID,
        CourseName: data.CourseName,
        Description: data.Description,
        InstructorID: data.InstructorID,
        Price: data.Price,
        Discount: data.Discount,
        Duration: data.Duration,
        img: null // Keep as null since this is a file input
      });
      setImagePreview(data.img); 
    }
  }, [data]);

  const onSubmit = async (values) => {
    console.log("values",values)
    const formData = new FormData();
    // Append the image file if uploaded, else keep existing image URL if editing
     // Append all fields to FormData
     formData.append("CourseID", values.CourseID);
     formData.append("CourseName", values.CourseName);
     formData.append("Description", values.Description);
     formData.append("InstructorID", values.InstructorID);
     formData.append("Price", values.Price);
     formData.append("Discount", values.Discount);
     formData.append("Duration", values.Duration);
    if (values.img) {
      formData.append("img", values.img);
    } else if (imagePreview) {
      formData.append("img", imagePreview); // Keep the existing image if no new file is uploaded
    }


    try {
      if (location.pathname.includes('addCourse')) {
        await addCourse(formData);
        window.alert("Form submitted successfully");
      } else {
        await updateCourse(formData);
        window.alert("Form updated successfully");
      }
      navigate("/courses");
    } catch (error) {
      console.error("Error in form submission", error);
    }
  };

  return (
    <div className="formContainer">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="form">
            <h1 className="text-[var(--clr-brown)] font-bold">Course Input Form</h1>
            {imagePreview && (
              <div>
                <h3>Current Image:</h3>
                <img src={imagePreview} alt="Course" className="image-preview" />
              </div>
            )}

            <div>
              <label htmlFor="CourseID">CourseID:</label>
              <Field name="CourseID" type="number" className="formInput" />
              <ErrorMessage name="CourseID" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="CourseName">CourseName:</label>
              <Field name="CourseName" type="text" className="formInput" />
              <ErrorMessage name="CourseName" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="Description">Description:</label>
              <Field name="Description" type="text" className="formInput" />
              <ErrorMessage name="Description" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="Price">Price:</label>
              <Field name="Price" type="number" className="formInput" />
              <ErrorMessage name="Price" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="Discount">Discount:</label>
              <Field name="Discount" type="number" className="formInput" />
              <ErrorMessage name="Discount" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="InstructorID">Instructor ID:</label>
              <Field as="select" name="InstructorID" className="my-select formInput">
                {[1, 2, 3, 4].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="InstructorID" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="Duration">Duration:</label>
              <Field name="Duration" type="number" className="formInput" />
              <ErrorMessage name="Duration" component="div" className="error" />
            </div>

           {(<div>
              <label htmlFor="img">Upload Image:</label>
              <input
                name="img"
                type="file"
                className="formInput"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("img", file);
                  }}
              />
              <ErrorMessage name="img" component="div" className="error" />
            </div>)}

            {data && data.img && (
              <div>
                <h3>Current Image:</h3>
                <img src={data.img} alt="Course" className="image-preview" />
                {/* <button onClick={()=>changeImage(e)}>Edit Image </button> */}
              </div>
           
            )} 
            {/* <button onClick={()=>setToggle(true)}>Change Image</button> */}

            <button type="submit" disabled={isSubmitting} className="btn-success">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const validationSchema = Yup.object({
  CourseID: Yup.number().required("Required"),
  CourseName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  Description: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  Price: Yup.number().max(3000).min(600).required("Required"),
  Discount: Yup.number().required("Required").min(5).max(25),
  Duration: Yup.string().min(2).max(20).required("Required"),
  InstructorID: Yup.number().required("Required"),
});

export default CourseInputForm;
