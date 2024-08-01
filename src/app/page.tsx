import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Home() {
	return (
		<main className="flex">
			<nav className="bg-white w-1/5 h-screen flex flex-col items-center p-10 overflow-hidden gap-20">
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
				<header>
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
				</header>
			</section>
		</main>
	);
}
