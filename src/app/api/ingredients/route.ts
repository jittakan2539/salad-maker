import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Ingredients from "@/app/lib/models/Ingredients";

export async function GET(request: NextRequest) {
	try {
		await dbConnect();

		const allIngredients = await Ingredients.find();
		console.log(allIngredients);

		return NextResponse.json(allIngredients);
	} catch (error) {
		console.error("Failed to fetch ingredients:", error);
		return NextResponse.json(
			{ error: "Failed to fetch ingredients" },
			{ status: 500 }
		);
	}
}
