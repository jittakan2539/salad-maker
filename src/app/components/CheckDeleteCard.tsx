import { FC, useState, useEffect } from "react";
import { FaXmark, FaCircleExclamation } from "react-icons/fa6";
// import { FaUtensils } from "react-icons/fa";
import axios from "axios";

interface CheckDeleteCardProps {
	toggleOpenDeleteCard: () => void;
	openDeleteCard: boolean;
}
const CheckDeleteCard: React.FC<CheckDeleteCardProps> = ({
	toggleOpenDeleteCard,
	openDeleteCard,
}) => {
	return (
		<>
			{openDeleteCard && (
				<section className="fixed inset-0 flex items-center justify-center bg-black/50 ">
					<article className="absolute top-28 bg-white z-50 p-5 rounded-lg   w-1/3">
						<section className="relative w-full flex flex-col items-center justify-center gap-3 px-10">
							<div className="bg-orange w-20 h-20 flex items-center justify-center rounded-full">
								<FaCircleExclamation className="text-4xl  text-white" />
							</div>

							<h1 className="font-bold text-2xl">Recipe Name</h1>

							<FaXmark
								className="absolute right-0 top-0 text-neutral-600 text-xl hover:cursor-pointer"
								// onClick={closeRecipeandClearNotify}
							/>
							<div className="flex w-full gap-2 pt-10">
								<button
									// onClick={closeRecipeandClearNotify}
									className="w-1/2 flex  items-center justify-center  bg-white font-bold text-xl text-black p-4 rounded-xl hover:shadow-lg transition duration-300"
								>
									Cancel
								</button>
								<button
									// onClick={handleSubmit}
									className="flex w-1/2  items-center justify-center  bg-green-500 font-bold text-xl text-white p-4 rounded-xl hover:bg-green-600 hover:shadow-lg transition duration-300"
								>
									Create New Recipe
								</button>
							</div>
						</section>
					</article>
				</section>
			)}
		</>
	);
};

export default CheckDeleteCard;
