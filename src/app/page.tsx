"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CategoryCard from "@/app/components/CategoryCard";
import IngredientCard from "./components/IngredientCard";

import { useState, useEffect } from "react";
import axios from "axios";

interface Ingredient {
	_id: string;
	ingredient: string;
	category: string;
	image: string;
	calories: number;
}

interface Category {
	id: string;
	image: string;
	category: string;
}

const categoryList: Category[] = [
	{
		id: "vegetable",
		image: "/images/green-leaf-lettuce.jpg",
		category: "vegetable",
	},
	{ id: "fruit", image: "/images/mix-berries.png", category: "fruit" },
	{ id: "topping", image: "/images/cashew-nut.png", category: "toppings" },
	{ id: "protein", image: "/images/grilled-beef.png", category: "protein" },
	{ id: "dressing", image: "/images/cream-dressing.jpg", category: "dressing" },
];

export default function Home() {
	const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
	const [selectCategories, setSelectCategories] = useState<string[]>([]);
	const [ingredientQuantities, setIngredientQuantities] = useState<{
		[key: string]: number;
	}>({});

	async function getQueryIngredients(categories: string[]) {
		try {
			const categoryQuery = categories.length
				? `category=${categories.join(",")}`
				: "";

			const response = await axios.get(`/api/ingredients?${categoryQuery}`);
			const { data } = response;
			setIngredientList(data);
		} catch (error) {
			console.log("Failed to get data:", error);
		}
	}

	useEffect(() => {
		getQueryIngredients(selectCategories);
	}, [selectCategories]);

	// ไว้ check ว่าเก็บค่า ingredientQuantities
	/* useEffect(() => {
		console.log("Ingredient quantities updated:", ingredientQuantities);
	}, [ingredientQuantities]); */

	const handleCategoryClick = (category: string) => {
		setSelectCategories((prevSelectedCategories) => {
			const newCategories = prevSelectedCategories.includes(category)
				? prevSelectedCategories.filter(
						(checkCategory) => checkCategory !== category
				  )
				: [...prevSelectedCategories, category];

			getQueryIngredients(newCategories);

			return newCategories;
		});
	};

	const handleIngredientPlusClick = (id: string) => {
		setIngredientQuantities((prevQuantities) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}));
	};

	const handleIngredientMinusClick = (id: string) => {
		setIngredientQuantities((prevQuantities) => {
			const newQuantities = { ...prevQuantities };
			if (newQuantities[id] > 0) {
				newQuantities[id] -= 1;
			}
			return newQuantities;
		});
	};

	return (
		<div className="flex">
			<nav className="bg-white w-1/5 flex flex-col items-center p-10 overflow-hidden gap-20 sticky top-0 h-screen">
				<h1 className="font-extrabold text-sky-950 text-4xl">
					SALADMAKER<span className="text-orange">.</span>
				</h1>
				<ul className="space-y-10 flex flex-col items-center">
					<li>
						<Link href="/" className="font-medium text-2xl text-slate-500">
							<div className="bg-amber-400 p-5 px-16 rounded-2xl text-white">
								{" "}
								Salad Maker
							</div>
						</Link>
					</li>
					<li>
						<Link
							href="/recipes"
							className="font-medium text-2xl text-slate-500"
						>
							Recipes
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex-1 flex flex-col pt-10 ">
				<header className="flex flex-col mb-8 px-10">
					<div className="flex items-center justify-between mb-8">
						<h1 className="font-extrabold text-neutral-800 text-4xl">
							Let&apos;s Create...your own salad!!!
						</h1>

						<div id="search-container" className="relative w-1/3">
							<span className="absolute inset-y-0 left-0 flex items-center px-3 cursor-pointer">
								<FaMagnifyingGlass className="text-orange" />
							</span>
							<input
								className="input-createAccount w-full pl-8 py-2 border border-gray-300 rounded"
								name="search"
								type="text"
								placeholder="Search ingredients to make a salad"
							/>
						</div>
					</div>
					<figure className="p-10 bg-yellow-200 rounded-xl">
						<div className="w-60 flex flex-col gap-5">
							<h2 className="font-extrabold text-sky-950 text-3xl">
								Fresh
								<br /> & tasty salads
							</h2>
							<p>
								Relax please, we&apos;ve got you covered every day of the week{" "}
							</p>
						</div>
					</figure>
				</header>

				<main className="flex-1 px-10">
					<section className="flex flex-col gap-8 mb-8">
						<h2 className="font-extrabold text-neutral-700 text-xl">
							Select Category
						</h2>
						<div className="flex gap-5">
							{categoryList.map((category) => (
								<CategoryCard
									key={category.id}
									image={category.image}
									category={category.category}
									isSelected={selectCategories.includes(category.category)}
									onClick={() => handleCategoryClick(category.category)}
								/>
							))}
						</div>
					</section>

					<section className="my-8">
						<h2 className="font-extrabold text-neutral-700 text-xl mb-8">
							Choose your ingredients to make a salad
						</h2>
						<div className="grid grid-cols-2 lg:grid-cols-4 pt-4 gap-4 md:gap-6">
							{ingredientList.length > 0 ? (
								ingredientList.map((ingredient) => (
									<IngredientCard
										key={ingredient._id}
										ingredient={ingredient}
										quantity={ingredientQuantities[ingredient._id] || 0}
										onPlusClick={() =>
											handleIngredientPlusClick(ingredient._id)
										}
										onMinusClick={() =>
											handleIngredientMinusClick(ingredient._id)
										}
									/>
								))
							) : (
								<p className="text-xl font-bold text-neutral-600 w-full">
									No ingredients available or loading ingredients...
								</p>
							)}
						</div>
					</section>
				</main>

				<section className="bg-white flex justify-between items-stretch p-4 mt-8 w-full gap-8">
					<div className=" md:w-4/5 flex gap-5 items-center bg-orange p-3 rounded-xl pl-6">
						<div className="bg-white w-12 h-12 flex items-center justify-center rounded-xl">
							<p className="font-medium text-2xl text-orange">3</p>
						</div>
						<p className="font-semibold text-2xl text-white">
							Your Ingredients
						</p>
					</div>
					<button className="flex  items-center justify-center  md:w-1/5 bg-green-500 font-bold text-2xl text-white p-4 rounded-xl hover:bg-green-600 transition duration-300">
						Create Recipe
					</button>
				</section>
			</div>
		</div>
	);
}
