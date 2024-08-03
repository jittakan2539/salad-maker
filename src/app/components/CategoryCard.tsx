import Image from "next/image";
import React from "react";

interface CategoryCardProps {
	image: string;
	category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, category }) => {
	return (
		<div className="bg-white w-40 h-40 rounded-xl flex flex-col gap-2 items-center p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
			<picture className="relative w-24 h-24">
				<Image
					src={image}
					alt={category}
					layout="fill"
					objectFit="cover"
					className="rounded-full "
				/>
			</picture>
			<h3 className="text-neutral-400 text-center">{category}</h3>
		</div>
	);
};

export default CategoryCard;
