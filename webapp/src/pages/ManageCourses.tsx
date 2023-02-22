import AllCoursesSideBar from "../components/AllCoursesSideBar";
import { Outlet } from "@tanstack/react-location";

function ManageCourses() {
  return (
    <>
      <div className="col-start-3 col-end-5 border border-r">
        <AllCoursesSideBar />
      </div>
      <div className="col-start-5 col-end-13 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default ManageCourses;
