import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { IdSchema } from "../common/zod-schemas";

export const updateLiveLinkHandler: RequestHandler = async (req, res, next) => {
  try {
    const courseId = IdSchema.parse(req.params.courseId);
    const liveLink = z.string().url().parse(req.body.liveLink);

    // Update the course in the database
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        liveLink,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
