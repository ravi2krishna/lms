import { useMatch } from "@tanstack/react-location";
import { useState } from "react";
import VimeoVideo from "../components/VimeoVideo";
import { LocationGenerics } from "../routes";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import useGetCourse from "../hooks/useGetCourse";
import CourseInformationTabs from "../components/CourseInformationTabs";

function Course() {
  const match = useMatch<LocationGenerics>();
  // const { videoContainerRef, width, height } = useElementSize();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [openChapters, setOpenChapters] = useState<number[]>([]);
  const { data } = useGetCourse(match.params.courseId);

  const toggleChapter = (chapterId: number) => {
    if (openChapters.includes(chapterId)) {
      setOpenChapters(openChapters.filter((id) => id !== chapterId));
      return;
    }

    setOpenChapters([...openChapters, chapterId]);
  };

  const toggleTopic = (topicId: number) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className="p-4">
        <div className="flex h-[75vh] space-x-8 p-4">
          <div className="prose w-2/6 overflow-auto border">
            {/* Index */}
            {data.modules.map((module) => (
              <div key={module.id} className="flex flex-col">
                <button
                  onClick={() => toggleChapter(module.id)}
                  className="flex w-full items-center justify-between border-b p-3 text-start"
                >
                  <span>{module.title}</span>
                  <label
                    className={clsx("swap", {
                      "swap-active": openChapters.includes(module.id),
                    })}
                  >
                    <FaAngleUp className={"swap-on"} />
                    <FaAngleDown className={"swap-off"} />
                  </label>
                </button>
                {module.topics.map((topic) => (
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    key={topic.id}
                    className={clsx(
                      {
                        "hidden transition-opacity": !openChapters.includes(
                          module.id
                        ),
                      },
                      selectedTopic === topic.id
                        ? "bg-primary text-white"
                        : "bg-gray-50",
                      "flex w-full items-center justify-between p-3 text-start hover:bg-primary hover:text-white"
                    )}
                  >
                    <span>{topic.title}</span>
                    <label
                      className={clsx("swap", {
                        "swap-active": selectedTopic === topic.id,
                      })}
                    >
                      <FaPauseCircle className={"swap-on"} />
                      <FaPlayCircle className={"swap-off"} />
                    </label>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="w-[70vw]">
            {/* Video */}
            {/* // TODO:  */}
            <VimeoVideo videoId={"76979871"} />
          </div>
        </div>
        <div className="pt-8">
          <CourseInformationTabs topicId={selectedTopic} course={data} />
        </div>
      </div>
    </>
  );
}

export default Course;
