import { FC } from "react";
import Image from "next/image";

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
					<p className="text-neutral-400">x {quantity}</p>
				</div>

				<p className="font-bold text-">
					+ {ingredient.calories} <span className="text-orange">Cal</span>
				</p>
			</section>
		</article>
	);
};

export default EditRecipeCard;
