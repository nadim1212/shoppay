import mongoose from "mongoose";

const connecttion = {};

export async function connectDb() {
    if (connecttion.isconnected) {
        console.log("Already connected to the database.");
        return;
    }
    if (mongoose.connection.length > 0) {
        connecttion.isconnected = mongoose.connections[0].readyState;
        if (connecttion.isconnected === 1) {
            console.log("Use previous connection to the database.");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Hello from database.");
    connecttion.isconnected = db.connections[0].readyState;
}