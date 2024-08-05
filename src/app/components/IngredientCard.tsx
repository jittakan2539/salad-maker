import { FC } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Ingredient {
	_id: string;
	ingredient: string;
	category: string;
	image: string;
	calories: number;
}

interface IngredientCardProps {
	ingredient: Ingredient;
	quantity: number;
	onPlusClick: () => void;
	onMinusClick: () => void;
}

const IngredientCard: FC<IngredientCardProps> = ({
	ingredient,
	quantity,
	onPlusClick,
	onMinusClick,
}) => {
	console.log(ingredient);
	return (
		<>
			<div className="items-start flex flex-col py-5  gap-4 bg-white rounded-xl px-5 h-80">
				<picture className="h-44 w-full relative overflow:hidden">
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

				{quantity > 0 ? (
					<span className="ml-auto flex gap-4 items-center">
						<button
							className=" bg-orange rounded-full p-3"
							onClick={onMinusClick}
						>
							<FaMinus className=" text-lg text-white" />
						</button>
						<p className="font-extrabold text-xl">{quantity}</p>
						<button
							className="ml-auto bg-orange rounded-full p-3"
							onClick={onPlusClick}
						>
							<FaPlus className=" text-lg text-white" />
						</button>
					</span>
				) : (
					<button
						className="ml-auto bg-orange rounded-full p-3"
						onClick={onPlusClick}
					>
						<FaPlus className=" text-lg text-white" />
					</button>
				)}
			</div>
		</>
	);
};

export default IngredientCard;
