import { FC } from "react";
import Link from "next/link";
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
	onDeleteClick: () => void;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, onDeleteClick }) => {
	return (
		<>
			<article className="items-start flex flex-col py-5  justify-between w-52 md:w-full gap-4 bg-orange rounded-xl px-5 h-64 md:h-80">
				<div className="bg-white p-3 py-5 w-full rounded-xl flex flex-col">
					<h3 className="font-semibold text-md font-sarabun ">
						{recipe.recipeName}
					</h3>
					<p className="text-2xl font-bold font-sarabun">
						{recipe.totalCalories} <span className="text-orange ">Cal</span>
					</p>
				</div>
				<div className="flex flex-col md:flex-row justify-center items-center w-full gap-3">
					<button
						className="bg-white flex gap-2 items-center justify-center w-full md:w-1/2 p-2 rounded-2xl md:rounded-3xl text-md md:text-lg  font-bold onClick"
						onClick={onDeleteClick}
					>
						<FaTrash className="text-red-500" />
						<p>Delete</p>
					</button>
					<Link
						href={`/edit-recipe/${recipe._id}`}
						className="bg-white flex gap-2 items-center justify-center w-full md:w-1/2 p-2 rounded-2xl md:rounded-3xl text-md md:text-lg font-bold hover:cursor-pointer"
					>
						<FaEdit />
						<p>Edit</p>
					</Link>
				</div>
			</article>
		</>
	);
};

export default RecipeCard;
