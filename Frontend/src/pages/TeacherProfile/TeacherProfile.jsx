import React, { useState,useEffect } from "react";
import "./teacherProfile.css";
import { NavLink } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import { useParams } from "react-router";
import profileImage from "./teacher_Profile_image copy.png"
import axios from 'axios';


const Teacher = () => {
  const { id } = useParams("");

  const [teacherData, setTeacherData] = useState("");
  const [coursesData, setCoursesData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/teacher/${id}`, {
        headers: {  
          "Content-Type": "application/json",
        },   
      });
      console.log("Response status:", response.status);
  
      if (response.status !== 200) {
        console.error("Error response:", response);
        throw new Error("No data available");
      }
  
      const data = response.data;

      console.log("____________________________")
      console.log("Fetched data:", data);
      setTeacherData(data.teacher);
      setCoursesData(data.courses);
    } catch (error) {
      console.error("Fetch error:", error.message);
      alert("Error fetching data");
    }
  };
  
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      
      <div className="body_container">
        <div className="container">
          <div className="row circle_img">
            <div className="col-10 circle_img_col d-flex align-items-start justify-content-center">
              

              <img
                className="circle_image"
                src={teacherData && teacherData.avatar ? teacherData.avatar.url : profileImage}
                alt="Teacher Profile"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-5 ">
              <div className="text-white mx-20">{teacherData.firstName + " " + teacherData.lastName}</div>
              <div className="text-white mx-20 mt-5">{teacherData.username}</div>
              <br />
              <br />
              <span className="text-white mx-20">
                <PlaceIcon /> Location : {teacherData.location}
              </span>
              <br />
              <br />
              <span className="text-white mx-20">
                <CalendarMonthIcon /> Joining Of Year : {teacherData.createdAt}
              </span>
              <br />
              <br />
              <span className="text-white mx-20">
                <EmailIcon /> Email : {teacherData.email}
              </span>
              <br />
              <br />
              <br />
              <br />
              <div className="btn-main mx-20">
                <NavLink to={`/teachereditprofile/${teacherData._id}`}>
                  <button className="btn-button">Edit Profile</button>
                </NavLink>
                <br />
                <NavLink to="#">
                  <button className="btn-button right_to_left_offset">
                    Upload Courses
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="col-md-5 ml-3 offset-1">
              <div className="flex justify-center items-center animated-text text-4xl">
                Description
              </div>
              <div className="content text-white text-2xl">
                Hey whatsup you guys? Marty Schwartz here and I am here to help
                you with your music learning
              </div>
              <div className="flex justify-center items-center animated-text text-4xl mt-4">
                Education
              </div>

              <div className="mt-3 text-2xl" style={{ color: "white" }} >
                <span className="whitespace-nowrap">Post Graduation from Angus University of Music, California : <img src="/degree.jpg" alt="degree" height={70} width={60} className="inline-block"/></span>
              </div>

              <div className="mt-3 text-2xl" style={{ color: "white" }}>
                <span className="whitespace-nowrap">Masters degree at Angus University of Music, California :<img src="/achievements.png" className="img-fluid rounded-circle inline-block" alt="degree" height={70} width={60} /></span>
              </div>

              <div className="d-flex justify-content-center align-items-center animated-text text-4xl">
                Experience
              </div>

              <div className="mt-3 text-2xl" style={{ color: "white" }}>
                On the teaching field since 2003
              </div>
              <div className="mt-3 text-2xl" style={{ color: "white" }}>
                Rock, Blues, Music Theory
              </div>

              <div className="d-flex justify-content-center align-items-center animated-text text-4xl mt-4">
                Achievements
              </div>

              <div className="mt-3 text-2xl" style={{ color: "white" }}>
                Masters degree at Angus University of Music, California :{" "}
               
              </div>
              <div className="mt-3 text-2xl" style={{ color: "white" }}>
                Grammy Award for Best New Artist
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div class="upload-heading d-flex justify-content-center align-items-center ml-6">
          <h1>UPLOADED COURSES</h1>
        </div>

        {/* <div className="container ">
          <div className="row card_container justify-content-center" id="col1">
            <div className="col-md-5">
              <a href="#">
                <img
                  src="/public/beginnerpic.jpg"
                  style={{ width: "360px", height: "180px" }}
                  className="grid-element "
                />
              </a>
              <p className="text-white offset-3">Acoustic Blues</p>
            </div>
          </div>
        </div> */}

        {coursesData.length > 0 && (
          <div className="container">
            <div className="row card_container justify-content-center" id="col1">
              {coursesData.map((course, index) => (
                <div key={index} className="col-md-5">
                  <a href="#">
                    <img
                      src={course.imageUrl}
                      style={{ width: "360px", height: "180px" }}
                      className="grid-element"
                      alt={course.title}
                    />
                  </a>
                  <p className="text-white offset-3">{course.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Teacher;























