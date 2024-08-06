import { FC } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Ingredient {
	id: string;
	ingredient: string;
	image: string;
	calories: number;
}

interface EditRecipeCardProps {
	ingredient: Ingredient;
	quantity: number;
}

const EditRecipeCard: FC<EditRecipeCardProps> = ({ ingredient, quantity }) => {
	return (
		<article className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
			<Image
				src={ingredient.image}
				alt={ingredient.ingredient}
				width={100}
				height={100}
				className="object-cover"
			/>
			<section className="flex justify-between w-full">
				<div>
					<h2 className="font-bold text-lg">{ingredient.ingredient}</h2>

					<div className="flex gap-3 items-center">
						<button className=" bg-orange w-6 h-6 flex items-center justify-center rounded-full p-1">
							<FaMinus className=" text-sm text-white" />
						</button>
						<p className="text-neutral-400">x {quantity}</p>
						<button className=" bg-orange w-6 h-6 flex items-center justify-center rounded-full p-1">
							<FaPlus className=" text-sm text-white" />
						</button>
						<button className=" bg-red-500 rounded-xl p-1 px-3">
							<p className="text-white">Delete</p>
						</button>
					</div>
				</div>

				<p className="font-bold text-">
					+ {ingredient.calories} <span className="text-orange">Cal</span>
				</p>
			</section>
		</article>
	);
};

export default EditRecipeCard;
