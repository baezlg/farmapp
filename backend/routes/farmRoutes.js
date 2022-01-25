import express from "express";
const router = express.Router();
import farmController from "../controllers/farmControllers.js";

router
  .route("/")
  .get(farmController.getAllFarms)
  .post(farmController.createFarm);

router
  .route("/:id")
  .get(farmController.getFarm)
  .patch(farmController.updateFarm)
  .delete(farmController.deleteFarm);

export default router;import express from "express";
const router = express.Router();
import farmController from "../controllers/farmControllers.js";

router
  .route("/")
  .get(farmController.getAllFarms)
  .post(farmController.createFarm);

router
  .route("/:id")
  .get(farmController.getFarm)
  .patch(farmController.updateFarm)
  .delete(farmController.deleteFarm);

export default router;