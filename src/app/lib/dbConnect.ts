import mongoose from "mongoose";

const connectMongoDb = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://jittakan2539:ZI4gLq9vS0vqxfWk@salad-maker.qbj4vjr.mongodb.net/salad-maker"
		);
		console.log("database connected");
	} catch (error) {
		console.error(error);
	}
};

export default connectMongoDb;
