import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Ingredients from "@/app/lib/models/Ingredients";

interface Query {
	category?: { $in: string[] };
	ingredient?: { $regex: string; $options: string };
}

const query: Query = {};

export async function GET(request: NextRequest) {
	await dbConnect();

	const { searchParams } = new URL(request.url);
	const categoriesParam = searchParams.get("category");
	const categories = categoriesParam ? categoriesParam.split(",") : [];

	const search = searchParams.get("name") || "";

	try {
		const query: any = {};

		if (categories.length) {
			query.category = { $in: categories };
		}

		if (search) {
			query.ingredient = { $regex: search, $options: "i" };
		}

		const ingredients = await Ingredients.find(query);

		return NextResponse.json(ingredients);
	} catch (error) {
		console.log("Failed to fetch ingredients", error);
		return NextResponse.json(
			{ error: "Failed to fetch ingredients" },
			{ status: 500 }
		);
	}
}
