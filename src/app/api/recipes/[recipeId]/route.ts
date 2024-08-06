import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Recipes from "@/app/lib/models/Recipes";

export async function GET(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();

		const { recipeId } = params;

		const recipeById = await Recipes.findById(recipeId).populate(
			`ingredientDetail.ingredientId`
		);

		if (!recipeById) {
			return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
		}

		return NextResponse.json(recipeById);
	} catch (error) {
		console.log("Failed to fetch the recipe", error);
		return NextResponse.json({ error: "Failed to fetch the recipe" });
		{
			status: 500;
		}
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();

		const { recipeId } = params;

		const recipeById = await Recipes.findByIdAndDelete(recipeId);

		if (!recipeId) {
			return NextResponse.json({ error: "Recipe Not found" }, { status: 404 });
		}

		const response = new NextResponse(
			`Recipe with ID ${recipeId} is deleted successfully.`,
			{
				headers: {
					"Content-Type": "text/plain",
				},
			}
		);

		return response;
	} catch (error) {
		console.log("Failed to delete the recipe", error);
		return NextResponse.json({ error: "Failed to delete the recipe" });
		{
			status: 500;
		}
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { recipeId: string } }
) {
	try {
		await dbConnect();

		const { recipeId } = params;

		const { ingredientDetail, removeIngredientId } = await request.json();

		if (!ingredientDetail || !Array.isArray(ingredientDetail)) {
			return NextResponse.json(
				{ error: "Invalid ingredient detail format" },
				{ status: 400 }
			);
		}

		const recipe = await Recipes.findById(recipeId);

		if (!recipe) {
			return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
		}

		if (removeIngredientId) {
			recipe.ingredientDetail = recipe.ingredientDetail.filter(
				(ingredient) =>
					ingredient.ingredientId.toString() !== removeIngredientId
			);
		} else {
			ingredientDetail.forEach(({ ingredientId, quantity }) => {
				const checkIngredient = recipe.ingredientDetail.find(
					(ingredient) => ingredient.ingredientId.toString() === ingredientId
				);

				if (checkIngredient) {
					checkIngredient.quantity = quantity;
				} else {
					recipe.ingredientDetail.push({ ingredientId, quantity });
				}
			});
		}

		await recipe.save();

		return NextResponse.json({
			message: `Recipe with ID${recipeId} updated successfully.`,
		});
	} catch (error) {
		console.error("Failed to update recipe:", error);
		return NextResponse.json(
			{ error: "Failed to update recipe recipe" },
			{ status: 500 }
		);
	}
}
