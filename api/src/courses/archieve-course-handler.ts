import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";

export const archiveCourseHandler: RequestHandler = async (req, res, next) => {
  try {
    const courseId = IdSchema.parse(req.params.courseId);
    const archived = z.boolean().parse(req.body.archived);

    // Update the course in the database
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        archived,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
