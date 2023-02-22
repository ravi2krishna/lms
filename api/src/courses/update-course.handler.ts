import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";

const updateCourseSchema = z.object({
  archived: z.boolean(),
  description: z.string().min(1),
  liveLink: z.string().url(),
  pictrue: z.string().url(),
  title: z.string().min(1),
});

export const updateCourseHandler: RequestHandler = async (req, res, next) => {
  try {
    // Validate data
    const courseId = IdSchema.parse(req.params.courseId);
    const data = updateCourseSchema.parse(req.body);

    // Update in db
    await db.course.update({
      where: {
        id: courseId,
      },
      data: data,
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
