"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import EditRecipeCard from "@/app/components/EditRecipeCard";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";

interface Ingredient {
	_id: string;
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
	const [deletedIngredients, setDeletedIngredients] = useState<string[]>([]);
	const [updatedSuccess, setUpdatedSuccess] = useState<null | boolean>(null);
	const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);

	const router = useRouter();

	const fetchRecipeData = useCallback(async (recipeId: string) => {
		try {
			const recipeResponse = await axios.get(`/api/recipes/${recipeId}`);
			const recipeWithIngredientData = recipeResponse.data;

			setRecipe(recipeWithIngredientData);

			console.log("Fetched recipe data:", recipeWithIngredientData);
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

	const handleIngredientPlusClick = (_id: string) => {
		setRecipe((prevRecipe) => {
			if (!prevRecipe) return prevRecipe;

			const updatedIngredientDetail = prevRecipe.ingredientDetail.map((item) =>
				item.ingredientId._id === _id
					? { ...item, quantity: (item.quantity || 0) + 1 }
					: item
			);

			return { ...prevRecipe, ingredientDetail: updatedIngredientDetail };
		});
	};

	const handleIngredientMinusClick = (_id: string) => {
		setRecipe((prevRecipe) => {
			if (!prevRecipe) return prevRecipe;

			const updatedIngredientDetail = prevRecipe.ingredientDetail.map((item) =>
				item.ingredientId._id === _id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			);

			return { ...prevRecipe, ingredientDetail: updatedIngredientDetail };
		});
	};

	const handleDeleteClick = async (ingredientId: string) => {
		setDeletedIngredients((prevIngredient) => [
			...prevIngredient,
			ingredientId,
		]);

		setRecipe((prevRecipe) => {
			if (!prevRecipe) return prevRecipe;

			const updatedIngredientDetail = prevRecipe.ingredientDetail.filter(
				(item) => item.ingredientId._id !== ingredientId
			);

			return { ...prevRecipe, ingredientDetail: updatedIngredientDetail };
		});
	};

	const handleNavigation = (path: string) => {
		router.push(path);
	};

	const handleUpdateRecipe = async () => {
		if (recipe) {
			try {
				await axios.patch(`/api/recipes/${recipe._id}`, {
					ingredientDetail: recipe.ingredientDetail.map(
						({ ingredientId, quantity }) => ({
							ingredientId: ingredientId._id,
							quantity,
						})
					),
					removeIngredientId: deletedIngredients,
				});

				setUpdatedSuccess(true);
			} catch (error) {
				console.log("Error updating recipe", error);
				setUpdatedSuccess(false);
			}
		}

		if (recipe?.ingredientDetail.length === 0) {
			try {
				await axios.delete(`/api/recipes/${recipe._id}`);
				handleNavigation("/recipes");
			} catch (error) {
				console.log("Failed to delete recipe", error);
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

			<section className=" flex-1 flex flex-col pt-10 px-10 gap-8">
				<h1 className="font-extrabold text-neutral-800 text-4xl">
					Edit Recipe
				</h1>
				<main className="relative bg-white p-5 rounded-xl flex flex-col gap-5">
					<Link
						onClick={() => setUpdatedSuccess(null)}
						href="/recipes"
						className="font-medium text-2xl text-slate-500"
					>
						<FaXmark className="absolute right-5 top-5 text-neutral-600 text-xl hover:cursor-pointer" />
					</Link>

					<h2 className="font-extrabold text-neutral-500 text-xl">
						Your ingredients to make a salad recipe
					</h2>
					<section className="flex flex-col">
						<h2 className="text-center font-extrabold text-neutral-700 text-2xl">
							{recipe?.recipeName}
						</h2>
						{updatedSuccess === true && (
							<p className="text-center font-bold text-green-500 text-xl">
								Update Success
							</p>
						)}
						{updatedSuccess === false && (
							<p className="text-center font-bold text-red-500 text-xl">
								Failed to Update
							</p>
						)}
					</section>

					<p className={`${loading ? "block" : "hidden"} font-semibold`}>
						Loading...
					</p>

					{!loading && recipe && (
						<div className="flex flex-col gap-4">
							{recipe.ingredientDetail.map(({ ingredientId, quantity }) => (
								<EditRecipeCard
									key={ingredientId._id}
									ingredient={ingredientId}
									quantity={quantity}
									onPlusClick={() =>
										handleIngredientPlusClick(ingredientId._id)
									}
									onMinusClick={() =>
										handleIngredientMinusClick(ingredientId._id)
									}
									onDeleteClick={() => handleDeleteClick(ingredientId._id)}
								/>
							))}
						</div>
					)}

					<hr className="border border-neutral-300" />

					<section className="flex justify-between">
						<p className="font-semibold">Total Calories</p>
						<p className="font-semibold text-xl">
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
