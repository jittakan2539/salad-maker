import Image from "next/image";
import Link from "next/link";

export default function Recipe() {
	return (
		<main className="flex">
			<nav className="bg-white w-1/5 flex flex-col items-center p-10 overflow-hidden gap-20 sticky top-0 h-screen">
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

			<section className="flex-1 flex flex-col p-10">
				<h1 className="font-extrabold text-neutral-800 text-4xl">Recipe</h1>
				<div>
					<h2>Your Recipe</h2>
				</div>
			</section>
		</main>
	);
}
