"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import CheckDeleteCard from "../components/CheckDeleteCard";
import { FaBars } from "react-icons/fa6";
interface IngredientDetail {
	ingredientId: string;
	quantity: number;
}
interface Recipe {
	_id: string;
	recipeName: string;
	ingredientDetail: IngredientDetail[];
	totalCalories: number;
}

export default function Recipe() {
	const [recipeList, setRecipeList] = useState<Recipe[]>([]);
	const [openDeleteCard, setOpenDeleteCard] = useState(false);
	const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
	const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);

	async function getAllRecipes() {
		try {
			const response = await axios.get(`/api/recipes`);
			console.log(response);
			const { data } = response;
			setRecipeList(data);
		} catch (error) {
			console.log("Failed to get recipe data", error);
		}
	}

	useEffect(() => {
		getAllRecipes();
	}, []);

	const toggleOpenDeleteCard = (id: string | null) => {
		setSelectedRecipeId(id);
		setOpenDeleteCard(!openDeleteCard);
	};

	const handleOpenMenuBar = () => {
		setOpenMenuBar(!openMenuBar);
	};

	return (
		<div className="flex flex-col xl:flex-row">
			<nav className="z-50 sticky top-0 overflow-hidden xl:h-screen bg-white w-full xl:w-96 flex flex-col xl:items-center pt-10 pb-5 px-5 md:px-10 gap-5 xl:gap-20 ">
				<section className="flex items-center justify-between  xl:px-0">
					<h1 className="font-extrabold text-sky-950 text-xl xl:text-4xl">
						<Link href="/">
							SALADMAKER<span className="text-orange">.</span>
						</Link>
					</h1>
					<button onClick={handleOpenMenuBar}>
						<FaBars className="block xl:hidden" />
					</button>
				</section>

				{openMenuBar && (
					<ul className="z-30 space-y-5 xl:space-y-10 flex xl:hidden flex-col items-center flex-1  xl:px-0">
						<li className="w-full flex justify-center">
							<Link
								href="/"
								className="font-medium text-xl md:text-2xl text-slate-500 w-full"
							>
								<div className="p-5 px-16 rounded-2xl text-black hover:shadow-xl  text-center mx-4 xl:mx-8">
									Salad Maker
								</div>
							</Link>
						</li>
						<li className="w-full flex justify-center">
							<Link
								href="/recipes"
								className="font-medium text-xl md:text-2xl text-slate-500 w-full"
							>
								<div className="bg-amber-400 p-5 px-16 rounded-2xl text-white text-center mx-4 xl:mx-8">
									Recipes
								</div>
							</Link>
						</li>
					</ul>
				)}
				<ul className="space-y-5 xl:space-y-10 hidden xl:flex flex-col items-center flex-1 px-5 xl:px-0">
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
				<main className="bg-white p-5 rounded-xl flex flex-col items-center md:block">
					<h2 className="font-extrabold text-neutral-700 text-xl">
						Your Recipe
					</h2>

					<section>
						{recipeList?.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-4 gap-4 md:gap-6">
								{recipeList.map((recipe) => (
									<RecipeCard
										key={recipe._id}
										recipe={recipe}
										onDeleteClick={() => toggleOpenDeleteCard(recipe._id)}
									/>
								))}
							</div>
						) : (
							<div className="w-full flex justify-center pt-4">
								<p className="text-xl font-bold text-neutral-600 text-center">
									No ingredients available or loading ingredients...
								</p>
							</div>
						)}
					</section>
				</main>
			</section>
			<CheckDeleteCard
				toggleOpenDeleteCard={toggleOpenDeleteCard}
				openDeleteCard={openDeleteCard}
				selectedRecipeId={selectedRecipeId}
				refreshRecipes={getAllRecipes}
			/>
		</div>
	);
}
