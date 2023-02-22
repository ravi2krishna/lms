import { Link } from "@tanstack/react-location";
import { HiArrowRight } from "react-icons/hi";
import { MdVideoCameraFront } from "react-icons/md";
import clsx from "clsx";
import { CourseListItem } from "../types/courses";
import courseSrc from "../assets/course.png";

type CourseCardProps = {
  course: CourseListItem;
};

function CourseCard(props: CourseCardProps) {
  const { course } = props;

  return (
    <div className=" grid h-40 w-full grid-cols-12 bg-white shadow-xl transition-shadow hover:shadow-lg">
      <div className="col-span-3 overflow-hidden">
        <img
          className="h-40 w-full"
          src={course.pictrue || courseSrc}
          alt={course.title}
        />
      </div>
      <div className="prose col-span-7 p-4">
        <h3 className="">{course.title}</h3>
        <p className="line-clamp-3">{course.description}</p>
      </div>
      <div className="col-span-2 flex flex-col gap-4 self-center pr-4">
        <a
          target={"_blank"}
          href={course.liveLink}
          className={clsx(
            "btn btn-primary capitalize",
            course.liveLink ? "btn-outline" : "btn-disabled"
          )}
          rel="noreferrer"
        >
          Live Class <MdVideoCameraFront className="ml-4 text-xl" />
        </a>
      </div>
    </div>
  );
}

export default CourseCard;
