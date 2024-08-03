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

		const recipeById = await Recipes.findById(recipeId);

		if (!recipeId) {
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
