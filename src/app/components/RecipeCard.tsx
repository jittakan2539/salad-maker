import { FC } from "react";
import Image from "next/image";
import { FaTrash, FaEdit } from "react-icons/fa";

interface IngredientDetail {
	ingredientId: string;
	quantity: number;
}

interface Recipe {
	_id: string;
	recipeName: string;
	ingredientDetail: IngredientDetail[];
	totalCalories: number;
}

interface RecipeCardProps {
	recipe: Recipe;
	// onEditClick: () => void;
	onDeleteClick: () => void;
}

const RecipeCard: FC<RecipeCardProps> = ({
	recipe,
	// onEditClick,
	onDeleteClick,
}) => {
	return (
		<>
			<article className="items-start flex flex-col py-5 justify-between  gap-4 bg-orange rounded-xl px-5 h-80">
				<div className="bg-white p-3 py-5 w-full rounded-xl flex flex-col">
					<h3 className="font-semibold text-md font-sarabun ">
						{recipe.recipeName}
					</h3>
					<p className="text-2xl font-bold font-sarabun">
						{recipe.totalCalories} <span className="text-orange ">Cal</span>
					</p>
				</div>
				<div className="flex w-full gap-3">
					<button
						className="bg-white flex gap-2 items-center justify-center w-1/2 p-2 rounded-3xl text-lg  font-bold onClick"
						onClick={onDeleteClick}
					>
						<FaTrash className="text-red-500" />
						<p>Delete</p>
					</button>
					<button
						className="bg-white flex gap-2 items-center justify-center w-1/2 p-2 rounded-3xl text-lg  font-bold"
						// onClick={onEditClick}
					>
						<FaEdit />
						<p>Edit</p>
					</button>
				</div>
			</article>
		</>
	);
};

export default RecipeCard;
