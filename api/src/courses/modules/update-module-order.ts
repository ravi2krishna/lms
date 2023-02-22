import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../../common/db";
import { IdSchema } from "../../common/zod-schemas";

export const updateModuleOrderHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const queryParams = await z
      .object({
        order: z.union([z.literal("up"), z.literal("down")]),
      })
      .parseAsync(req.query);

    const moduleId = await IdSchema.parseAsync(req.params.moduleId);
    const courseId = await IdSchema.parseAsync(req.params.courseId);

    const courseData = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        modulesOrder: true,
      },
    });

    if (!courseData) {
      return res.sendStatus(400);
    }

    const moduleIndex = courseData?.modulesOrder.findIndex(
      (i) => i === moduleId
    );

    if (
      moduleIndex === -1 ||
      (moduleIndex === 0 && queryParams.order === "up") || // Can't move first one any more up
      (moduleIndex === courseData.modulesOrder.length - 1 &&
        queryParams.order === "down") // Can't move last one down
    ) {
      return res.sendStatus(400);
    }

    const newModulesOrder: number[] = [...courseData.modulesOrder];
    const indexPositionToSwap =
      queryParams.order === "up"
        ? (moduleIndex + courseData.modulesOrder.length - 1) %
          courseData.modulesOrder.length
        : (moduleIndex + 1) % courseData.modulesOrder.length;
    newModulesOrder[moduleIndex] = newModulesOrder[indexPositionToSwap]; // Next one in the cylce
    newModulesOrder[indexPositionToSwap] = moduleId;

    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        modulesOrder: newModulesOrder,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
