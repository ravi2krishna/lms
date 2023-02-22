import { useMatch } from "@tanstack/react-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdArchive, MdUnarchive, MdVideoCameraFront } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";
import axiosInstance from "../lib/http-client";
import { Course } from "../types/courses";
import IF from "./IF";

type CourseInfoProps = {
  course: Course;
};

function CourseInfo(props: CourseInfoProps) {
  const { course } = props;
  const liveLinkInputRef = useRef<HTMLInputElement>(null);

  const match = useMatch();
  const queryClient = useQueryClient();

  const invalidateCourseData = async () => {
    // Invalidate course data
    await queryClient.invalidateQueries(["getCourse", match.params.courseId]);
  };

  const archieveMutation = useMutation({
    mutationKey: ["toggle-archieved-state", course.id],
    mutationFn: async () => {
      const { data } = await axiosInstance.patch(
        `/courses/${course.id}/archieved`,
        {
          archived: !course.archived,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      invalidateCourseData();
      toast(`Course updated successfully`, {
        type: "success",
      });
    },
  });

  const liveLinkMutation = useMutation({
    mutationKey: ["update-live-link", course.id],
    mutationFn: async () => {
      const { data } = await axiosInstance.patch(
        `/courses/${course.id}/live-link`,
        {
          liveLink: liveLinkInputRef.current?.value,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      invalidateCourseData();
      toast(`Live link updated successfully`, {
        type: "success",
      });
    },
  });

  const handleLiveLinkUpdate = () => {
    if (
      z
        .string()
        .url()
        .safeParse(liveLinkInputRef.current?.value || "").success
    ) {
      liveLinkMutation.mutate();
    } else {
      toast(`Invalid URL`, {
        type: "error",
        toastId: "invalid-url",
      });
    }
  };

  const isAdminPage = match.pathname.includes("admin");

  return (
    <div>
      <div className="prose flex flex-col space-y-4">
        <span>
          <b>Name</b>: {course.title}
        </span>

        <span>
          <b>Description</b>: {course.description}
        </span>
        <span>
          <b>Modules</b>: {course.modules.length}
        </span>
        <span>
          <b>Live class</b>:{" "}
          {course.liveLink ? (
            <a
              className="link link-primary"
              target={"_blank"}
              href={course.liveLink}
              rel="noreferrer"
            >
              {course.liveLink}
            </a>
          ) : (
            "NA"
          )}
        </span>
        <IF condition={isAdminPage}>
          {/* Update live link */}
          <div className="flex">
            <input
              type="url"
              name="live-link"
              ref={liveLinkInputRef}
              id="live-link"
              className="input input-primary w-full rounded-none"
            />
            <button
              className={clsx(
                "btn btn-primary flex w-min flex-nowrap whitespace-nowrap rounded-none capitalize",
                {
                  loading: liveLinkMutation.isLoading,
                }
              )}
              onClick={handleLiveLinkUpdate}
              disabled={liveLinkMutation.isLoading}
            >
              <span>Save Live Class Link </span>
              <MdVideoCameraFront className="ml-4 text-xl" />
            </button>
          </div>

          {course.archived ? (
            <div className="alert alert-warning rounded-none shadow-lg">
              <div>
                <FaExclamationTriangle />
                <span>
                  Course is archived. You can unarchive it to make it available
                  to students.
                </span>
              </div>
            </div>
          ) : null}
        </IF>
      </div>
      <IF condition={isAdminPage}>
        <button
          className={clsx("btn btn-warning mt-4 capitalize", {
            loading: archieveMutation.isLoading,
          })}
          onClick={() => archieveMutation.mutate()}
          disabled={archieveMutation.isLoading}
        >
          {course.archived ? (
            <span className="flex items-center">
              <MdUnarchive className="mr-2" /> Unarchive
            </span>
          ) : (
            <span className="flex items-center">
              <MdArchive className="mr-2" /> Archive
            </span>
          )}
        </button>
      </IF>
    </div>
  );
}
export default CourseInfo;
