import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Student } from "./pages/Student";
import { Navbar } from "./components/Navbar";
import { StudentSignup } from "./pages/Auth/StudentSignup";
import { FacultySignup } from "./pages/Auth/FacultySignup";
import { Login } from "./pages/Auth/Login";

import "./css/global.css";
import { NewsUpload } from "./pages/News-Events/NewsUpload";
import { News } from "./pages/News-Events/News";
import { NewsById } from "./pages/News-Events/NewsById";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Notice } from "./pages/Notice/Notice";
import { NoticeUpload } from "./pages/Notice/NoticeUpload";
import { Department } from "./pages/Departments/Department";
import { DepartmentByName } from "./pages/Departments/DepartmentByName";
import { DepartmentLayout } from "./layout/DepartmentLayout";

import { DepartmentFaculty } from "./pages/Departments/DepartmentFaculty";
import { DepartmentStaff } from "./pages/Departments/DepartmentStaff";
import { DepartmentStudentClub } from "./pages/Departments/DepartmentStudentClub";
import { DepartmentStudent } from "./pages/Departments/DepartmentStudent";
import { DepartmentAcademicProgram } from "./pages/Departments/DepartmentAcademicProgram";
import { DepartmentLabs } from "./pages/Departments/DepartmentLabs";
import { DepartmentProjects } from "./pages/Departments/DepartmentProjects";
import { DepartmentEvents } from "./pages/Departments/DepartmentEvents";
import { DepartmentResearchPublication } from "./pages/Departments/DepartmentResearchPublication";
import { DepartmentInteraction } from "./pages/Departments/DepartmentInteraction";
import { DepartmentOtherInfo } from "./pages/Departments/DepartmentOtherInfo";
import { DepartmentAlumni } from "./pages/Departments/DepartmentAlumni";
import { DepartmentPlacement } from "./pages/Departments/DepartmentPlacement";
import { DepartmentAchievement } from "./pages/Departments/DepartmentAchievement";
import { Profile } from "./pages/Profile/Profile";
import { ProfilePageUpload } from "./pages/Profile/ProfilePageUpload";

import { Hostels } from "./pages/Facility/Hostels/Hostels";
import { HostelById } from "./pages/Facility/Hostels/HostelById";
import { Signup } from "./pages/Auth/Signup";

import { Library } from "./pages/Facility/Library/Library";
import { Ncc } from "./pages/Facility/NCC/Ncc";
import { Scf } from "./pages/Facility/Sports/Scf";
import { Grnc } from "./pages/Facility/Guest-Room/Grnc";
import { Bs } from "./pages/Facility/Bus-Service/bs";
import { ClubsByName } from "./pages/Clubs/ClubsByName";
import {Tpc} from "./pages/Tpc/Tpc"
import {TpcLayout} from "./pages/Tpc/TpcLayout"

import { MarkdownEditor } from "./components/MarkdownEditor"
import { Result } from "./pages/Academic/result";
import { NotFound404 } from "./components/NotFound404";
import Footer from "./components/Footer";
import { Admission } from "./pages/Academic/Admission";
import { MsgFromTPO } from "./pages/Tpc/MsgFromTPO";
import { FacilityTpo } from "./pages/Tpc/FacilityTpo";
import { PlacementTpo } from "./pages/Tpc/PlacementTpo";
import { MembersTpo } from "./pages/Tpc/MembersTpo";
import { EventsTpo } from "./pages/Tpc/EventsTpo";
import { NoticeTpo } from "./pages/Tpc/NoticeTpo";

import Contact from "./pages/Contact/Contact";


function App() {
  const { auth, setauth } = useAuth();

  const fetchCredentials = async (tokenid) => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/verify-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenid}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.success) {
      setauth({
        isAuthenticated: true,
        role: data.message.role,
        tokenid: tokenid,
        username: data.message.username,
        email: data.message.email,
      });
    } else {
      localStorage.removeItem("tokenid");
      setauth({ isAuthenticated: false, role: [], tokenid: "" });
    }
  };
  useEffect(() => {
    const tokenid = localStorage.getItem("tokenid");
    if (tokenid && auth.isAuthenticated === false) {
      fetchCredentials(tokenid);
    }
  }, [auth]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/student" element={<Student />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/signup">
            <Route index element={<Signup />} />
            <Route path="student" element={<StudentSignup />} />
            <Route path="faculty" element={<FacultySignup />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="/news-events">
          <Route index element={<News />} />
          <Route
            path="upload"
            element={
              <ProtectedRoutes>
                <NewsUpload />
              </ProtectedRoutes>
            }
          />
          <Route path=":id" element={<NewsById />} />
        </Route>
        <Route path="/notice">
          <Route index element={<Notice />} />
          <Route
            path="upload"
            element={
              <ProtectedRoutes>
                <NoticeUpload />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="/department">
          <Route index element={<Department />} />

          <Route path=":department_name" element={<DepartmentLayout />}>
            <Route index element={<DepartmentByName />} />
            <Route path="faculty" element={<DepartmentFaculty />} />
            <Route path="staff" element={<DepartmentStaff />} />
            <Route path="student" element={<DepartmentStudent />} />
            <Route
              path="academic-program"
              element={<DepartmentAcademicProgram />}
            />
            <Route path="labs" element={<DepartmentLabs />} />
            <Route path="projects" element={<DepartmentProjects />} />
            <Route path="events" element={<DepartmentEvents />} />
            <Route
              path="research-publication"
              element={<DepartmentResearchPublication />}
            />
            <Route path="interaction" element={<DepartmentInteraction />} />
            <Route path="achievement" element={<DepartmentAchievement />} />
            <Route path="placement" element={<DepartmentPlacement />} />
            <Route path="student-club" element={<DepartmentStudentClub />} />
            <Route path="alumni" element={<DepartmentAlumni />} />
            <Route path="other-info" element={<DepartmentOtherInfo />} />
          </Route>
        </Route>

        <Route path="/profile/:n/:username">
          <Route index element={<Profile />} />
          <Route path="upload" element={<ProfilePageUpload />} />
        </Route>

        <Route path="/facility">
          <Route index element={""} />
          <Route path="hostel">
            <Route index element={<Hostels />} />
            <Route path=":hostel_no" element={<HostelById />} />
          </Route>
          <Route path="library" element={<Library />} />
          <Route path="national-cadet-corps" element={<Ncc />} />
          <Route path="sports-cultural-facility" element={<Scf />} />
          <Route path="guest-house-canteen" element={<Grnc />} />
          <Route path="bus-service" element={<Bs />} />
        </Route>

        <Route path="/club">
          <Route index element={""} />
          <Route path=":club_name" element={<ClubsByName />} />
        </Route>

        <Route path="/traning-and-placement-cell" element={<TpcLayout/>} >

            <Route index element={<Tpc/>}/>
            <Route path="message-from-tpo" element={<MsgFromTPO/>}/>
            <Route path="facility" element={<FacilityTpo/>}/>
            <Route path="placement" element={<PlacementTpo/>}/>
            <Route path="members" element={<MembersTpo/>}/>
            <Route path="events" element={<EventsTpo/>}/>
            <Route path="notice" element={<NoticeTpo/>}/>
            
        </Route>

        <Route path="/academic">
          <Route index element={""} />
          <Route path="admission" element={<Admission/>} />
          <Route path="result/:year" element={<Result />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
