import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useState } from "react";
import CourseInfo from "../components/CourseInfo";
import useGetCourse from "../hooks/useGetCourse";
import { Tabs } from "../types/courses";

export const CourseTabsList: Tabs[] = ["Course Info"];

// type ManageCourseProps = {};

function ManageCourse() {
  const [activeTab, setActiveTab] = useState<Tabs>("Course Info");
  const match = useMatch();
  const { data } = useGetCourse(match.params.courseId);

  if (!data) {
    return null;
  }

  let tabContent = null;
  switch (activeTab) {
    case "Course Info":
      tabContent = <CourseInfo course={data} />;
      break;
    case "Modules":
    default:
      break;
  }

  return (
    <div className="mt-5">
      <div className="tabs">
        {CourseTabsList.map((tab) => (
          <button
            key={tab}
            className={clsx("tab tab-bordered tab-lg pb-0", {
              "tab-active": tab === activeTab,
            })}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">{tabContent}</div>
    </div>
  );
}
export default ManageCourse;
