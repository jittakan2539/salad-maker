import Image from "next/image";
import Link from "next/link";

export default function Recipe() {
	return (
		<main className="flex">
			<nav className="bg-white w-1/5 h-screen flex flex-col items-center p-10 overflow-hidden gap-20">
				<h1 className="font-bold text-sky-950 text-4xl">
					SALADMAKER<span className="text-orange">.</span>
				</h1>
				<ul>
					<li>
						<Link href="/">Salad maker</Link>
					</li>
					<li>
						<Link href="/recipes">Salad maker</Link>
					</li>
				</ul>
			</nav>

			<h1>recipes</h1>
		</main>
	);
}
