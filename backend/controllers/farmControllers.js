import catchAsync from "express-async-handler";
import Farm from "./../models/farmModel.js";

const farmController = {
  getAllFarms: catchAsync(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query;
    let farms;
    let count;
    count = await Farm.countDocuments(JSON.parse(queryStr));
    if (queryObj.new) {
      query = await Farm.find(JSON.parse(queryStr))
        .sort({ datetime: -1 })
        .limit(30);
      count = 30;
      farms = await query;
    } else {
      query = Farm.find(JSON.parse(queryStr));
      let page = req.query.page * 1 || 1;
      let limit = 100;
      let skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        if (skip >= count) {
          return res.status(401).json("page doesn't exists");
        }
      }
      farms = await query;
    }

    res.status(200).json({
      result: farms.length,
      totalFarms: count,
      pages: Math.ceil(count / 100),
      data: farms,
    });
  }),
  getFarm: catchAsync(async (req, res) => {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
      res.status(401).json("Farm doesn't exist");
    }

    res.status(200).json(farm);
  }),
  createFarm: catchAsync(async (req, res) => {
    const newFarm = await Farm.create(req.body);
    if (!newFarm) {
      res.status(401).json("error creating farm");
    }
    res.status(201).json(newFarm);
  }),
  updateFarm: catchAsync(async (req, res) => {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!farm) {
      res.status(401).json("farm not found");
    }
    res.status(200).json(farm);
  }),
  deleteFarm: catchAsync(async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    if (!farm) {
      res.status(401).json("farm not found");
    }
    res.status(200).json("item deleted");
  }),
  farmStatsbyLocation: catchAsync(async (req, res) => {
    const stats = await Farm.aggregate([
      {
        $group: {
          _id: "$location",
          numFarms: { $sum: 1 },
          avgValue: { $avg: "$value" },
          minValue: { $min: "$value" },
          maxValue: { $max: "$value" },
        },
      },
      {
        $addFields: { location: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (!stats) {
      res.status(401).json("farm not found");
    }
    res.status(200).json(stats);
  }),
  farmStatsbySensorType: catchAsync(async (req, res) => {
    const stats = await Farm.aggregate([
      {
        $group: {
          _id: "$sensorType",
          numFarms: { $sum: 1 },
          avgValue: { $avg: "$value" },
          minValue: { $min: "$value" },
          maxValue: { $max: "$value" },
        },
      },
      {
        $addFields: { sensorType: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (!stats) {
      res.status(401).json("farm not found");
    }
    res.status(200).json(stats);
  }),
  farmMonthlyStats: catchAsync(async (req, res) => {
    const year = req.params.year * 1;
    const stats = await Farm.aggregate([
      {
        $match: {
          datetime: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$datetime" },
          numFarms: { $sum: 1 },
          farms: { $addToSet: "$location" },
          avgValue: { $avg: "$value" },
          minValue: { $min: "$value" },
          maxValue: { $max: "$value" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (!stats) {
      res.status(401).json("farm not found");
    }
    res.status(200).json(stats);
  }),
};

export default farmController;
