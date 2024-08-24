import mongoose from "mongoose";

const connectToMongoDB = async () => {
try {
  await mongoose.connect(process.env.MONGO_DB_URI!)
} catch (error: any) {
  console.error("Error connecting")
}
}

export default connectToMongoDB;