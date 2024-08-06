import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRecipes extends Document {
	recipeName: string;
	ingredientDetail: {
		ingredientId: mongoose.Schema.Types.ObjectId;
		quantity: number;
	}[];
	totalCalories: number;
}

const RecipesSchema: Schema = new mongoose.Schema(
	{
		recipeName: { type: String, required: true },
		ingredientDetail: [
			{
				ingredientId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Ingredients",
					required: true,
				},
				quantity: { type: Number, required: true, min: 0 },
			},
		],

		totalCalories: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Recipes: Model<IRecipes> =
	mongoose.models.Recipes || mongoose.model<IRecipes>("Recipes", RecipesSchema);

export default Recipes;
