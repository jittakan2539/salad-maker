"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CategoryCard from "@/app/components/CategoryCard";
import IngredientCard from "./components/IngredientCard";
import CreateRecipeCard from "./components/CreateRecipeCard";
import { FaBars, FaBowlFood } from "react-icons/fa6";

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
	const [totalCalories, setTotalCalories] = useState<number>(0);
	const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);

	async function getQueryIngredients(categories: string[], search: string) {
		try {
			const categoryQuery = categories.length
				? `category=${categories.join(",")}`
				: "";

			const searchQuery = search ? `&name=${search}` : "";

			const response = await axios.get(
				`/api/ingredients?${categoryQuery}${searchQuery}`
			);
			const { data } = response;
			setIngredientList(data);
		} catch (error) {
			console.log("Failed to get ingredient data:", error);
		}
	}

	useEffect(() => {
		getQueryIngredients(selectCategories, searchTerm);
	}, [selectCategories, searchTerm]);

	useEffect(() => {
		const calculateTotalCalories = () => {
			let calories = 0;
			for (const ingredient of ingredientList) {
				const quantity = ingredientQuantities[ingredient._id] || 0;
				if (quantity > 0) {
					calories = calories + ingredient.calories * quantity;
				}
			}
			setTotalCalories(calories);
		};

		calculateTotalCalories();
	}, [ingredientQuantities, ingredientList]);

	const handleCategoryClick = (category: string) => {
		setSelectCategories((prevSelectedCategories) => {
			const newCategories = prevSelectedCategories.includes(category)
				? prevSelectedCategories.filter(
						(checkCategory) => checkCategory !== category
				  )
				: [...prevSelectedCategories, category];

			getQueryIngredients(newCategories, searchTerm);

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

	const allQuantities = Object.values(ingredientQuantities).reduce(
		(accumulator, quantity) => accumulator + quantity,
		0
	);

	const resetQuantities = () => {
		setIngredientQuantities({});
	};

	const toggleOpenCreateRecipe = () => {
		setOpenCreateRecipe(!openCreateRecipe);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
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
					<ul className="z-30 space-y-5 xl:space-y-10 flex xl:hidden flex-col items-center flex-1 px-5 xl:px-0">
						<li>
							<Link href="/" className="font-medium text-2xl text-slate-500">
								<div className="bg-amber-400 p-5 px-16 rounded-2xl text-white w-72 text-center">
									Salad Maker
								</div>
							</Link>
						</li>
						<li>
							<Link
								href="/recipes"
								className="font-medium text-2xl text-slate-500"
							>
								<div className=" p-5 px-16 rounded-2xl text-black hover:shadow-xl w-72 text-center">
									Recipes
								</div>
							</Link>
						</li>
					</ul>
				)}
				<ul className="space-y-5 xl:space-y-10 hidden xl:flex flex-col items-center flex-1 px-5 xl:px-0">
					<li>
						<Link href="/" className="font-medium text-2xl text-slate-500">
							<div className="bg-amber-400 p-5 px-16 rounded-2xl text-white w-72 text-center">
								Salad Maker
							</div>
						</Link>
					</li>
					<li>
						<Link
							href="/recipes"
							className="font-medium text-2xl text-slate-500"
						>
							<div className=" p-5 px-16 rounded-2xl text-black hover:shadow-md w-72 text-center">
								Recipes
							</div>
						</Link>
					</li>
				</ul>
			</nav>

			<div className="z-1 flex-1 flex flex-col pt-5 md:pt-10 ">
				<header className="flex flex-col mb-8 px-5 md:px-10">
					<div className="flex flex-col gap-5 xl:flex-row items-center justify-between mb-0 md:mb-8">
						<h1 className=" font-extrabold text-neutral-800 text-2xl md:text-4xl">
							Let&apos;s Create...your own salad!!!
						</h1>

						<div className="hidden md:block relative w-full md:w-2/3 xl:w-1/3">
							<span className="absolute inset-y-0 left-0 flex items-center px-5 cursor-pointer">
								<FaMagnifyingGlass className="text-orange" />
							</span>
							<input
								className="w-full pl-10 py-2 border border-gray-300 rounded-lg"
								name="search"
								type="text"
								placeholder="Search ingredients to make a salad"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
						<div className="block md:hidden relative w-full  ">
							<span className="absolute inset-y-0 left-0 flex items-center px-5 cursor-pointer">
								<FaMagnifyingGlass className="text-orange" />
							</span>
							<input
								className="w-full pl-10 py-2 border border-gray-300 rounded-lg"
								name="search"
								type="text"
								placeholder="Search ingredients"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
					<figure className="hidden md:block p-10 bg-yellow-200 rounded-xl">
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

				<main className="flex flex-col gap-5 md:gap-16 px-5 md:px-10">
					<section className="flex flex-col gap-3 md:gap-5">
						<h2 className="font-extrabold text-neutral-700 text-xl">
							Select Category
						</h2>
						<div className="flex gap-5 overflow-x-scroll md:overflow-visible">
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

					<section className="flex flex-col gap-3 md:gap-5">
						<h2 className="font-extrabold text-neutral-700 text-xl">
							Choose your ingredients to make a salad
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 md:gap-6">
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

				{allQuantities > 0 && (
					<article className="bg-white flex flex-col md:flex-row justify-between items-stretch p-4 mt-8 w-full gap-2 md:gap-8 sticky bottom-0">
						<section className="w-full md:w-4/6 flex gap-5 items-center justify-between bg-orange p-2 md:p-3 md:px-5 rounded-xl pl-6">
							<div className="flex md:text-row items-center gap-3 md:gap-5 justify-between">
								<div className="bg-white w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl">
									<p className="font-medium text-2xl text-orange">
										{allQuantities}
									</p>
								</div>
								<p className="hidden md:block font-semibold text-lg md:text-2xl text-white">
									Your Ingredients
								</p>
								<FaBowlFood className="block md:hidden text-white text-xl" />
							</div>
							<p className="font-semibold text-lg md:text-2xl text-white pr-5">
								{totalCalories} Cal
							</p>
						</section>
						<section className="flex flex-row w-full md:w-2/6 gap-2 md:gap-8">
							<button
								onClick={resetQuantities}
								className="flex items-center justify-center w-full  bg-red-500 font-bold text-lg md:text-2xl text-white p-2 md:p-4 rounded-xl hover:bg-red-600 transition duration-300"
							>
								Reset
							</button>
							<button
								onClick={toggleOpenCreateRecipe}
								className="flex  items-center justify-center w-full  bg-green-500 font-bold text-lg md:text-2xl text-white p-2 md:p-4 rounded-xl hover:bg-green-600 transition duration-300"
							>
								Create Recipe
							</button>
						</section>
					</article>
				)}
				<CreateRecipeCard
					toggleOpenCreateRecipe={toggleOpenCreateRecipe}
					openCreateRecipe={openCreateRecipe}
					ingredientQuantities={ingredientQuantities}
					totalCalories={totalCalories}
					resetQuantities={resetQuantities}
				/>
			</div>
		</div>
	);
}
