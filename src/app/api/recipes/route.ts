import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Recipes from "@/app/lib/models/Recipes";
import Ingredients from "@/app/lib/models/Ingredients";

export async function POST(request: NextRequest) {
	try {
		await dbConnect();

		const { recipeName, ingredientDetail, totalCalories } =
			await request.json();

		if (!recipeName) {
			return NextResponse.json(
				{ error: "recipe name is required" },
				{ status: 400 }
			);
		}

		const alreadyExistRecipe = await Recipes.findOne({ recipeName });
		if (alreadyExistRecipe) {
			return NextResponse.json(
				{ error: `A recipe with the name ${recipeName} already exists.` },
				{ status: 400 }
			);
		}

		for (let ingredient of ingredientDetail) {
			const ingredientExists = await Ingredients.exists({
				_id: ingredient.ingredientId,
			});

			if (!ingredientExists) {
				return NextResponse.json(
					{
						error: `Ingredients with ID ${ingredient.ingredientId} does not exist.`,
					},
					{ status: 400 }
				);
			}
		}

		const newRecipe = new Recipes({
			recipeName,
			ingredientDetail,
			totalCalories,
		});

		await newRecipe.save();

		return NextResponse.json(newRecipe, { status: 201 });
	} catch (error) {
		console.error("Failed to create recipe:", error);
		return NextResponse.json(
			{ error: "Failed to create recipe" },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		await dbConnect();

		const allRecipes = await Recipes.find();
		console.log(allRecipes);

		return NextResponse.json(allRecipes);
	} catch (error) {
		console.error("Failed to fetch recipes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recipes" },
			{ status: 500 }
		);
	}
}
