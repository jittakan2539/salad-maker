import { FC } from "react";
import Image from "next/image";
// import { FaPlus, FaMinus } from "react-icons/fa";

interface IngredientDetail {
	ingredientId: string;
	quantity: number;
}

interface Recipe {
	_id: string;
	recipeName: string;
	ingredientDetail: IngredientDetail[];
}

// interface IngredientCardProps {
// 	ingredient: Ingredient;
// 	quantity: number;
// 	onPlusClick: () => void;
// 	onMinusClick: () => void;
// }
interface RecipeCardProps {
	recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
	return (
		<>
			<article className="items-start flex flex-col py-5  gap-4 bg-orange rounded-xl px-5">
				<div className="bg-white p-3 py-5 w-full rounded-xl flex flex-col">
					<h3 className="font-normal text-md font-sarabun ">
						{recipe.recipeName}
					</h3>
					<p className="text-2xl font-bold font-sarabun">
						63 <span className="text-orange ">Cal</span>
					</p>
				</div>
			</article>
		</>
	);
};

export default RecipeCard;
