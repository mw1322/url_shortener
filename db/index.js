import mongoose from "mongoose";
import { DB_NAME } from "../constraint.js";
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log( 
          `Database connected succesfully ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("Mongodb does not connected");
    }
}
export default connectDb;