import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      default: Date.now(),
    },
    sensorType: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
