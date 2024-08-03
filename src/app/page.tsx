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

export default function Home() {
	const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

	async function getQueryIngredients() {
		try {
			const response = await axios.get("/api/ingredients");
			const { data } = response;
			setIngredientList(data);
		} catch (error) {
			console.log("Failed to get data:", error);
		}
	}

	useEffect(() => {
		getQueryIngredients();
	}, []);

	console.log(`This is ${ingredientList}`);
	return (
		<div className="flex">
			<nav className="bg-white w-1/5  flex flex-col items-center p-10 overflow-hidden gap-20">
				<h1 className="font-extrabold text-sky-950 text-4xl">
					SALADMAKER<span className="text-orange">.</span>
				</h1>
				<ul className="space-y-4">
					<li>
						<Link href="/">Salad Maker</Link>
					</li>
					<li>
						<Link href="/recipes">Recipes</Link>
					</li>
				</ul>
			</nav>

			<section className="flex-1 p-10">
				<header className="flex flex-col">
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

				{/* -------------ส่วนของ main---------- */}
				<main className="my-8 ">
					{/* -------------ส่วนเลือก category---------- */}
					<CategoryCard />

					{/* -------------ส่วนเลือก ingredients---------- */}
					<section className="my-8 ">
						<h2 className="font-extrabold text-neutral-700 text-xl mb-8">
							Choose your ingredients to make a salad
						</h2>

						{/* Ingredient Card------------------ */}

						<div className="grid grid-cols-2 lg:grid-cols-4 pt-4 gap-4 md:gap-6">
							{Array.isArray(ingredientList) && ingredientList.length > 0 ? (
								ingredientList.map((ingredient) => (
									<IngredientCard
										key={ingredient._id}
										ingredient={ingredient}
									/>
								))
							) : (
								<p>No ingredients available.</p>
							)}
						</div>
					</section>
				</main>
			</section>
		</div>
	);
}
