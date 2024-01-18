import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectDB() {
  try {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) {
      return console.log("Missing MongoDB url");
    }

    if (isConnected) {
      return console.log("MongoDB already connected");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "belanjaku",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
