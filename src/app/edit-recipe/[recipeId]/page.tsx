"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import EditRecipeCard from "@/app/components/EditRecipeCard";
import { FaXmark } from "react-icons/fa6";

interface Ingredient {
	id: string;
	ingredient: string;
	image: string;
	calories: number;
}

interface IngredientDetail {
	ingredientId: Ingredient;
	quantity: number;
}

interface Recipe {
	_id: string;
	recipeName: string;
	ingredientDetail: IngredientDetail[];
	totalCalories: number;
}

export default function EditRecipe({
	params,
}: {
	params: { recipeId: string };
}) {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchRecipeData = useCallback(async (recipeId: string) => {
		try {
			const recipeResponse = await axios.get(`/api/recipes/${recipeId}`);
			const recipeWithIngredientData = recipeResponse.data;

			setRecipe(recipeWithIngredientData);
		} catch (error) {
			console.error("Error fetching recipe data", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (params.recipeId) {
			fetchRecipeData(params.recipeId);
		}
	}, [params.recipeId, fetchRecipeData]);

	const handleUpdateRecipe = async () => {
		if (recipe) {
			try {
				await axios.patch(`/api/recipes/${recipe._id}`, recipe);
				alert("Recipe updated successfully!");
			} catch (error) {
				console.log("Error updating recipe", error);
				alert("Failed to update recipe.");
			}
		}
	};

	const calculateTotalCalories = () => {
		if (recipe && recipe.ingredientDetail) {
			const totalCalories = recipe.ingredientDetail.reduce(
				(total, { ingredientId, quantity }) => {
					return total + ingredientId.calories * quantity;
				},
				0
			);
			return totalCalories;
		}

		return 0;
	};

	return (
		<div className="flex">
			<nav className="bg-white w-96 flex flex-col items-center p-10 overflow-hidden gap-20 sticky top-0 h-screen">
				<h1 className="font-extrabold text-sky-950 text-4xl">
					SALADMAKER<span className="text-orange">.</span>
				</h1>
				<ul className="space-y-10 flex flex-col items-center">
					<li>
						<Link href="/" className="font-medium text-2xl text-slate-500">
							<div className="p-5 px-16 rounded-2xl text-black hover:shadow-md w-72 text-center">
								Salad Maker
							</div>
						</Link>
					</li>
					<li>
						<Link
							href="/recipes"
							className="font-medium text-2xl text-slate-500"
						>
							<div className="bg-amber-400 p-5 px-16 rounded-2xl text-white w-72 text-center">
								Edit
							</div>
						</Link>
					</li>
				</ul>
			</nav>

			<section className=" flex-1 flex flex-col pt-10 px-10 gap-8">
				<h1 className="font-extrabold text-neutral-800 text-4xl">
					Edit Recipe
				</h1>
				<main className="relative bg-white p-5 rounded-xl flex flex-col gap-5">
					<Link href="/recipes" className="font-medium text-2xl text-slate-500">
						<FaXmark className="absolute right-5 top-5 text-neutral-600 text-xl hover:cursor-pointer" />
					</Link>

					<h2 className="font-extrabold text-neutral-700 text-xl">
						Your ingredients to make a salad Recipe
					</h2>
					<p className={`${loading ? "block" : "hidden"} font-semibold`}>
						Loading...
					</p>

					{!loading && recipe && (
						<div className="flex flex-col gap-4">
							{recipe.ingredientDetail.map(({ ingredientId, quantity }) => (
								<EditRecipeCard
									key={ingredientId.id}
									ingredient={ingredientId}
									quantity={quantity}
								/>
							))}
						</div>
					)}

					<hr className="border border-neutral-300" />
					<section className="flex justify-between">
						<p className="font-semibold">Total Calorie</p>
						<p className="font-semibold">
							{calculateTotalCalories()}{" "}
							<span className="text-orange">Cal</span>
						</p>
					</section>
					<button
						className="bg-orange rounded-lg p-2 py-3 text-white font-bold"
						onClick={handleUpdateRecipe}
					>
						Update Recipe
					</button>
				</main>
			</section>
		</div>
	);
}
