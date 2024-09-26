import React, { useRef } from "react";
import CourseCard from "./CourseCard";
import "./course.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { deleteById, getCourseByName, gettAllCourse } from "./apis/courseApi";

const Course = () => {
  const dataLoader = useLoaderData();
  const [courses, setCourses] = useState(dataLoader);
  const [dataNotFound, setDataNotFound] = useState("");

  const [value, setValue] = React.useState(" ");
  const sortOptions = [
    "Price",
    "CourseID",
    "Duration",
    "Discount",
    "CourseName",
  ];

  const sortCourses = (prop) => {
    const sortedArr = [...courses].sort((a, b) => {
      const valA = a[prop];
      const valB = b[prop];
      console.log(valA, valB);
      if (
        (typeof valA && typeof valB == "string") ||
        (typeof valA && typeof valB == "String")
      ) {
        return valA.localeCompare(valB);
      }
      return valA - valB;
    });
    setCourses(sortedArr);
  };
  const getCourses = async () => {
    const data = await gettAllCourse();
    setCourses(data);
  };

  const deleteCard = async (courseId) => {
    console.log(courseId);
    const ans = window.confirm("Do you really want to delete?");
    if (ans) {
      const data = await deleteById(courseId);
      console.log("data to delete", data);
      if (data.affectedRows > 0) {
        window.alert("deletd successfully");
        getCourses();
      }
    } else {
      window.alert("SOmething went wrong..");
    }
  };

  const searchNode = useRef();

  const search = async (name) => {
    console.log(name);
    if (name !== "") {
      const data = await getCourseByName(name);
      console.log("data fetched to front end", data);
      if (data.length > 0) {
        setCourses(data);
      } else {
        // setCourses([]);
        setDataNotFound(() => <p className="text-red-500">Data not found</p>);
      }
    } else {
      setDataNotFound("");
      setCourses(dataLoader);
    }
  };

  const coursesElements = courses.map((course) => (
    <CourseCard course={course} deleteCard={deleteCard} />
  ));

  return (
    <>
      <div className="float-right m-6 p-2 bg-[var(--clr-secondary)] w-[200px] h-[35px] text-center border-[--clr-brown]">
        <label>Sort by:</label>
        <select
          onChange={(e) => {
            setValue(e.target.value);
            sortCourses(e.target.value);
          }}
          value={value}
        >
          {sortOptions.map((opt, index) => (
            <option key={index}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="m-2 text-center">
        <label className="text-[var(--clr-dark)] ">Search by name</label>
        <input
          type="text"
          ref={searchNode}
          onKeyUp={() => search(searchNode.current.value)}
          className="border border-blue-500"
        />
        {dataNotFound}
      </div>

      <div className="courseContainer">{coursesElements}</div>
    </>
  );
};

export default Course;
