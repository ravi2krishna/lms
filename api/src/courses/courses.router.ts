import { Router } from "express";
import { createCourseHandler } from "./create-course.handler";
import { getAllCoursesHandler } from "./get-all-courses.handler";
import { getCourseHandler } from "./get-course.handler";
import { getMyCoursesHandler } from "./get-my-courses.handler";
import moduleRouter from "./modules/module.router";
import { archiveCourseHandler } from "./archieve-course-handler";
import { updateCourseHandler } from "./update-course.handler";
import { updateLiveLinkHandler } from "./update-live-link.handler";

const coursesRouter = Router();

coursesRouter.route("/").post(createCourseHandler).get(getMyCoursesHandler);

coursesRouter.get("/all", getAllCoursesHandler);

coursesRouter
  .route("/:courseId")
  .get(getCourseHandler)
  .put(updateCourseHandler);

coursesRouter.patch("/:courseId/archieved", archiveCourseHandler);

coursesRouter.patch("/:courseId/live-link", updateLiveLinkHandler);

// Modules
coursesRouter.use("/:courseId/modules", moduleRouter);

export default coursesRouter;
