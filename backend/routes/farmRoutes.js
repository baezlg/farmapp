import express from "express";
const router = express.Router();
import farmController from "../controllers/farmControllers.js";

router.get("/stats/by-location", farmController.farmStatsbyLocation);
router.get("/stats/by-sensortype", farmController.farmStatsbySensorType);
router.get("/stats/monthly-stats/:year", farmController.farmMonthlyStats);
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
