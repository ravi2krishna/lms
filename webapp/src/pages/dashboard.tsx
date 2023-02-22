import useGetCourses from "../hooks/useGetCourses";
import CourseCard from "../components/CourseCard";
import Text from "../components/Text";
import { Helmet } from "react-helmet";
import Banner from "../components/Banner";

function Dashboard() {
  const coursesQuery = useGetCourses();

  if (!coursesQuery.data) {
    return null;
  }

  if (coursesQuery.data.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Courses</title>
        </Helmet>
        <Banner />
        <div className="mx-auto max-w-4xl py-8 text-center">
          <Text>
            <h2>{"There's nothing here..."}</h2>
            <p>
              Enrolled courses will appear here, click below button to contact
              the academy.
            </p>
            <a
              href="mailto:kona@konamars.com"
              className="btn btn-primary capitalize"
            >
              Enroll Me!
            </a>
          </Text>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Courses</title>
      </Helmet>
      <Banner />
      <div className="mx-auto max-w-5xl space-y-4 p-4">
        <Text className="py-4">
          <h1>Your Courses</h1>
        </Text>
        {coursesQuery.data.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
