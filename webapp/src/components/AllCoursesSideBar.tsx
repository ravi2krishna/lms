import { Link, useLocation, useMatch, useRouter } from "@tanstack/react-location";
import clsx from "clsx";
import useGetAllCourses from "../hooks/useGetAllCourses";

function AllCoursesSideBar() {
  const courses = useGetAllCourses();
  const match = useMatch();
  const router  = useRouter();
  console.log("🚀 ~ file: AllCoursesSideBar.tsx ~ line 9 ~ AllCoursesSideBar ~ router", router)
  const location = useLocation();
  console.log("🚀 ~ file: AllCoursesSideBar.tsx ~ line 11 ~ AllCoursesSideBar ~ location", location)
  console.log("🚀 ~ file: AllCoursesSideBar.tsx ~ line 8 ~ AllCoursesSideBar ~ match", match)

  if (!courses.data) {
    return null;
  }

  return (
    <div>
      <div className="flex h-12 items-center border-b">
        <input
          className="h-full w-full px-4 focus:border-primary-focus"
          placeholder="🔎  Search courses"
        />
      </div>
      {courses.data.map((course) => (
        <div
          key={course.id}
          className={clsx(
            "flex h-12 items-center border-b px-4 hover:font-bold hover:text-purple-600",
            {}
          )}
        >
          <Link to={course.id}>{course.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default AllCoursesSideBar;
