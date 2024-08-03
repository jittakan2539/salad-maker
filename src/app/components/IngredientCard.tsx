import { FC } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

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
			<div className="items-start flex flex-col py-8 gap-4 md:gap-6 bg-white rounded-xl px-5">
				<picture className="h-52 w-full relative overflow:hidden">
					<Image
						src={ingredient.image}
						alt={ingredient.ingredient}
						layout="fill"
						objectFit="cover"
						className="transition-transform duration-300 ease-in-out transform hover:scale-105"
					/>
				</picture>
				<caption className="items-start flex flex-col ">
					<h3 className="font-semibold text-md font-sarabun ">
						{ingredient.ingredient}
					</h3>
					<p className="text-2xl font-bold font-sarabun">
						{ingredient.calories} <span className="text-orange ">Cal</span>
					</p>
				</caption>
				<div className="ml-auto bg-orange rounded-full p-3">
					<FaPlus className=" text-lg text-white" />
				</div>
			</div>
		</>
	);
};

export default IngredientCard;
