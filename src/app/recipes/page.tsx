"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

interface Recipe {
	recipeName: string;
	ingredientDetail: string[];
}

export default function Recipe() {
	const [recipeList, setRecipeList] = useState<Recipe>([]);

	async function getAllRecipes() {
		try {
			const response = await axios.get(`/api/recipes`);
			console.log(response);
		} catch (error) {
			console.log("Failed to get recipe data", error);
		}
	}

	useEffect(() => {
		getAllRecipes();
	}, []);

	return (
		<div className="flex">
			<nav className="bg-white w-1/5 flex flex-col items-center p-10 overflow-hidden gap-20 sticky top-0 h-screen">
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
								Recipes
							</div>
						</Link>
					</li>
				</ul>
			</nav>

			<section className="flex-1 flex flex-col pt-10 px-10 gap-8">
				<h1 className="font-extrabold text-neutral-800 text-4xl">Recipe</h1>
				<main className="bg-white p-5 rounded-xl">
					<h2 className="font-extrabold text-neutral-700 text-xl">
						Your Recipe
					</h2>
					<div className="grid grid-cols-2 lg:grid-cols-4 pt-4 gap-4 md:gap-6">
						{/* {ingredientList.length > 0 ? (
							ingredientList.map((ingredient) => (
								<IngredientCard
									key={ingredient._id}
									ingredient={ingredient}
									quantity={ingredientQuantities[ingredient._id] || 0}
									onPlusClick={() => handleIngredientPlusClick(ingredient._id)}
									onMinusClick={() =>
										handleIngredientMinusClick(ingredient._id)
									}
								/>
							))
						) : (
							<p className="text-xl font-bold text-neutral-600 w-full">
								No ingredients available or loading ingredients...
							</p>
						)} */}
					</div>
				</main>
			</section>
		</div>
	);
}
