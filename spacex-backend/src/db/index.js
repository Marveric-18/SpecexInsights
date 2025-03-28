import mongoose from "mongoose";
let mongoDB;
async function connectDB() {
  mongoDB = await mongoose.connect("mongodb://localhost:27017/spacex-etl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
}


async function disconnectDB() {
    await mongoose.disconnect();
    
}
export {
    connectDB,
    disconnectDB
};
