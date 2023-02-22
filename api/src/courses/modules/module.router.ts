import { Router } from "express";
import { createModuleHandler } from "./create-module.handler";
import { deleteModuleHandler } from "./delete-module.handler";
import { updateModuleOrderHandler } from "./update-module-order";
import { updateModuleHandler } from "./update-module.handler";

const moduleRouter = Router({
  mergeParams: true, // If this is not true params from parent router are dropped.
  // https://expressjs.com/en/4x/api.html#express.router
});

moduleRouter.post("/", createModuleHandler);

moduleRouter
  .route("/:moduleId")
  .delete(deleteModuleHandler)
  .put(updateModuleHandler)
  .patch(updateModuleOrderHandler);

export default moduleRouter;
