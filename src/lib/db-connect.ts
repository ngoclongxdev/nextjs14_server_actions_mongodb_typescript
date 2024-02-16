import mongoose from "mongoose";

export default async function dbConnect() {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Success connection.");
	} catch (err) {
		throw new Error("Connection failed.");
	}
}