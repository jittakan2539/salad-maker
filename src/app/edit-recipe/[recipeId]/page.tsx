import React from "react";
import Link from "next/link";
import axios from "axios";

export default function EditRecipe() {
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

			<section className="flex-1 flex flex-col pt-10 px-10 gap-8">
				<h1 className="font-extrabold text-neutral-800 text-4xl">
					Edit Recipe
				</h1>
				<main className="bg-white p-5 rounded-xl">
					<h2 className="font-extrabold text-neutral-700 text-xl">
						Your ingredients to make a salad Recipe
					</h2>
				</main>
			</section>
		</div>
	);
}
