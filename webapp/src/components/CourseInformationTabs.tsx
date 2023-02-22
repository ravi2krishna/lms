import { useState } from "react";
import CourseInfo from "./CourseInfo";
import clsx from "clsx";
import Assignments from "./Assignments";
import Projects from "./Projects";
import Resources from "./Resources";
import { TabsList } from "../lib/constants";
import { Course, Tabs } from "../types/courses";

type CourseInformationTabsProps = {
  course: Course;
  topicId: number | null;
};

function CourseInformationTabs(props: CourseInformationTabsProps) {
  const [activeTab, setActiveTab] = useState<Tabs>("Course Info");

  let tabContent = null;
  switch (activeTab) {
    case "Course Info":
      tabContent = <CourseInfo course={props.course} />;
      break;
    case "Resources": {
      const resourceFiles = props.course.modules
        .map((module) => module.topics)
        .flat()
        .find((topic) => topic.id === props.topicId)?.resourceFiles;
      tabContent = <Resources resourceFiles={resourceFiles} />;
      break;
    }
    case "Assignments": {
      const assignmentFiles = props.course.modules
        .map((module) => module.topics)
        .flat()
        .find((topic) => topic.id === props.topicId)?.assignmentFiles;
      tabContent = <Assignments assignmentFiles={assignmentFiles} />;
      break;
    }
    case "Projects":
      tabContent = <Projects projectFiles={props.course.projectFiles} />;
      break;
    default:
      break;
  }

  return (
    <div className="mt-5">
      <div className="tabs">
        {TabsList.map((tab) => (
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
      {activeTab === "Course Info" ? null : (
          <div className="p-4">
            {/* <UpdateFiles message="please select files with size below 5mb" /> */}
          </div>
      )}
    </div>
  );
}
export default CourseInformationTabs;
