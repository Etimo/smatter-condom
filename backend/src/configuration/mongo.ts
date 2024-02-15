import mongoose, { ConnectOptions } from "mongoose";
const uri = process.env.MONGO_DB_CONNECTION_STRING ?? "";
const opts:ConnectOptions =  {
};

const connection = await mongoose.connect(
    uri,
    opts
   );


export default connection;
