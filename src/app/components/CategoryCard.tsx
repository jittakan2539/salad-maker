import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface CategoryCardProps {
	image: string;
	category: string;
	isSelected: boolean;
	onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
	image,
	category,
	isSelected,
	onClick,
}) => {
	return (
		<div
			className="relative bg-white w-40 h-40 rounded-xl flex flex-col gap-2 items-center p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
			onClick={onClick}
		>
			<picture className="relative w-24 h-24">
				<Image
					src={image}
					alt={category}
					layout="fill"
					objectFit="cover"
					className="rounded-full "
				/>
			</picture>
			{isSelected && (
				<FaCheckCircle className="text-xl absolute top-2 right-2 text-green-500" />
			)}

			<h3 className="text-neutral-400 text-center">{category}</h3>
		</div>
	);
};

export default CategoryCard;
