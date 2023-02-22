import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../../common/db";
import { IdSchema } from "../../common/zod-schemas";

export const updateModuleSchema = z.object({
  title: z.string().min(1),
  topics: z
    .array(
      z.object({
        title: z.string().min(1),
        videoLink: z.string().url(),
      })
    )
    .min(1),
});

export const updateModuleHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await updateModuleSchema.parseAsync(req.body);
    const courseId = await IdSchema.parseAsync(req.params.courseId);
    const moduleId = await IdSchema.parseAsync(req.params.moduleId);
    const updatedModule = await db.module.update({
      where: {
        id: moduleId,
      },
      data: {
        title: data.title,
        courseId: courseId,
        topics: {
          deleteMany: {
            modulesId: moduleId,
          },
          createMany: {
            data: data.topics,
          },
        },
      },
    });

    return res.json({
      title: updatedModule.title,
      id: updatedModule.id,
    });
  } catch (error) {
    next(error);
  }
};
