import { FC } from "react";
import Image from "next/image";
// import { FaPlus, FaMinus } from "react-icons/fa";

// interface Ingredient {
// 	_id: string;
// 	ingredient: string;
// 	category: string;
// 	image: string;
// 	calories: number;
// }

// interface IngredientCardProps {
// 	ingredient: Ingredient;
// 	quantity: number;
// 	onPlusClick: () => void;
// 	onMinusClick: () => void;
// }

const RecipeCard: FC<RecipeCardProps> = ({
	ingredient,
	quantity,
	onPlusClick,
	onMinusClick,
}) => {
	return (
		<>
			<div className="items-start flex flex-col py-5  gap-4 bg-white rounded-xl px-5"></div>
		</>
	);
};

export default RecipeCard;
