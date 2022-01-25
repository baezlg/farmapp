import mongoose from "mongoose";
import dotenv from "dotenv";
import csvtojson from "csvtojson";
import Farm from "./models/farmModel.js";
import connectDB from "./config/DB.js";

dotenv.config();

connectDB();

// CSV file name
// const fileName = "Nooras_farm.csv";
// const fileName = "ossi_farm.csv";
// const fileName = "friman_metsola.csv";
//const fileName = "PartialTech.csv";

var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        location: source[i]["location"],
        datetime: source[i]["datetime"],
        sensorType: source[i]["sensorType"],
        value: source[i]["value"],
      };
      arrayToInsert.push(oneRow);
    }
    arrayToInsert.map((item) => {
      if (item.location && item.datetime && item.sensorType && item.value) {
        if (
          item.sensorType === "temperature" &&
          item.value >= -50 &&
          item.value <= 100
        ) {
          Farm.insertMany(item, (err, res) => {
            console.log("inserted");
          });
        }
        if (item.sensorType === "pH" && item.value >= 0 && item.value <= 14) {
          Farm.insertMany(item, (err, res) => {
            console.log("inserted");
          });
        }
        if (
          item.sensorType === "rainFall" &&
          item.value >= 0 &&
          item.value <= 500
        ) {
          Farm.insertMany(item, (err, res) => {
            console.log("inserted");
          });
        }
      }
    });
  });
