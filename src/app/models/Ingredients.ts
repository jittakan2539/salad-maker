import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for the Ingredient document
export interface IIngredients extends Document {
	ingredient: string;
	category: string;
	image: string | null;
	calories: number;
}

// Create the schema for the Ingredient document
const IngredientsSchema: Schema<IIngredients> = new mongoose.Schema({
	ingredient: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ["vegetable", "fruit", "protein", "dressing", "toppings"],
		required: true,
	},
	image: {
		type: String,
		default: null, // Ensure null is the default if not provided
	},
	calories: {
		type: Number,
		required: true,
	},
});

// Create the Ingredient model from the schema
const Ingredients: Model<IIngredients> = mongoose.model<IIngredients>(
	"Ingredients",
	IngredientsSchema
);

export default Ingredients;
