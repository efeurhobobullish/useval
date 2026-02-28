import mongoose from "mongoose"
import process from "process"

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL

    if (!uri) {
      throw new Error("MONGODB_URL missing")
    }

    await mongoose.connect(uri)

    console.log("✅ Database connected 🚀")
  } catch (error) {
    console.error("❌ Database connection failed")
    console.error(error.message)
    process.exit(1)
  }
}

export default connectDB
