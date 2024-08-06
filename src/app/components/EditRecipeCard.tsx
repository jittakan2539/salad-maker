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
		<div className="flex items-center gap-4 p-4 border rounded-lg shadow-md">
			<Image
				src={ingredient.image}
				alt={ingredient.ingredient}
				width={100}
				height={100}
				className="object-cover"
			/>
			<div>
				<h2 className="font-bold text-lg">{ingredient.ingredient}</h2>
				<p>x {quantity}</p>
				<p>{ingredient.calories} Cal</p>
			</div>
		</div>
	);
};

export default EditRecipeCard;
