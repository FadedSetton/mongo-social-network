import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

const connection = mongoose.connection;
export default connection;
