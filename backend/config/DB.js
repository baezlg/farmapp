import mongoose from "mongoose";
import catchAsync from "express-async-handler";

const connectDB = catchAsync(async () => {
  const conn = await mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  if (!conn) {
    console.error(`${conn.catch((e) => e.message)}`);
    process.exit(1);
  }
  console.log(`MongoDB connected: ${conn.connection.host}`);
});

export default connectDB;
