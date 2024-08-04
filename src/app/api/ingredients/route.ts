import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Ingredients from "@/app/lib/models/Ingredients";

export async function GET(request: NextRequest) {
	try {
		await dbConnect();

		const { searchParams } = new URL(request.url);
		const categoriesParam = searchParams.get("category");
		const categories = categoriesParam ? categoriesParam.split(",") : [];

		// Create the query object
		const query =
			categories.length > 0 ? { category: { $in: categories } } : {};

		const ingredientsByCategory = await Ingredients.find(query);

		return NextResponse.json(ingredientsByCategory);
	} catch (error) {
		console.log("Failed to fetch ingredients", error);
		return NextResponse.json(
			{ error: "Failed to fetch ingredients" },
			{ status: 500 }
		);
	}
}
