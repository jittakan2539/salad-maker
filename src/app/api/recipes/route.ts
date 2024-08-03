import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Recipes from "@/app/lib/models/Recipes";
import Ingredients from "@/app/lib/models/Ingredients";

export async function POST(request: NextRequest) {
	try {
		await dbConnect();

		const { ingredientDetail } = await request.json();

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

		const newRecipe = new Recipes({ ingredientDetail });

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

//get all recipes
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

//get recipe by ID
