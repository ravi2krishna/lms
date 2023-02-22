import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";

export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  archived: z.preprocess(
    (value) => value === "true",
    z.boolean().default(false)
  ),
});

export const createCourseHandler: RequestHandler = async (req, res, next) => {
  try {
    console.log(
      "🚀 ~ file: create-course.handler.ts ~ line 17 ~ constcreateCourseHandler:RequestHandler= ~ req.body",
      req.body
    );
    const data = await createCourseSchema.parseAsync(req.body);
    const course = await db.course.create({
      data,
    });
    res.status(201).json({
      id: course.id,
      title: course.title,
    });
  } catch (error) {
    next(error);
  }
};
