import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Ingredients from "@/app/lib/models/Ingredients";

export async function GET(
	request: NextRequest,
	{ params }: { params: { category: string } }
) {
	try {
		await dbConnect();

		const { category } = params;

		const ingredientsByCategory = await Ingredients.find({ category });

		return NextResponse.json(ingredientsByCategory);
	} catch (error) {
		console.log("Failed to fetch ingredients", error);
		return NextResponse.json({ error: "Failed to fetch ingredients" });
		{
			status: 500;
		}
	}
}
