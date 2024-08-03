import { FC } from "react";
import Image from "next/image";

interface Ingredient {
	_id: string;
	ingredient: string;
	category: string;
	image: string;
	calories: number;
}

interface IngredientCardProps {
	ingredient: Ingredient;
}

const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
	console.log(ingredient);
	return (
		<>
			<div className="grid grid-cols-2 lg:grid-cols-4 pt-4 gap-4 md:gap-6 bg-white">
				<Image
					src={ingredient.image}
					alt={ingredient.ingredient}
					width={200}
					height={200}
				/>
				<h3>{ingredient.ingredient}</h3>
				<p>{ingredient.calories} Cal</p>
			</div>
		</>
	);
};

export default IngredientCard;
