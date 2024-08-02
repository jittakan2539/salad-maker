import React from "react";

export default function CategoryCard() {
	const categories: Category[] = [];

	return (
		<section className="flex flex-col gap-8">
			<h2 className="font-extrabold text-neutral-700 text-xl">
				Select Category
			</h2>
			<div className="bg-white w-40 h-40 rounded-xl flex flex-col items-center p-3">
				<img src="" alt="" />
				<p className="text-neutral-400">Names</p>
			</div>
		</section>
	);
}
