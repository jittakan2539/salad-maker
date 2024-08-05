import { FC } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";

interface CreateRecipeCardProps {
	toggleOpenCreateRecipe: () => void;
	openCreateRecipe: boolean;
}
const CreateRecipeCard: React.FC<CreateRecipeCardProps> = ({
	toggleOpenCreateRecipe,
	openCreateRecipe,
}) => {
	return (
		<>
			{openCreateRecipe && (
				<section className="fixed inset-0 flex items-center justify-center bg-black/50 ">
					<article className="absolute top-28 bg-white z-50 p-5 rounded-lg   w-1/3">
						<section className="relative w-full flex flex-col items-center justify-center gap-3 px-10">
							<div className="bg-orange w-20 h-20 flex items-center justify-center rounded-full">
								<FaUtensils className="text-4xl  text-white" />
							</div>

							<h1 className="font-bold text-2xl">Recipe Name</h1>
							<input
								type="text"
								className="border border-neutral-400 rounded-lg px-5 p-2 w-full"
								placeholder="Input your Recipe Name..."
							/>

							{/* Add the rest of your component's content here */}
							<FaXmark
								className="absolute right-0 top-0 text-neutral-600 text-xl hover:cursor-pointer"
								onClick={toggleOpenCreateRecipe}
							/>
							<div className="flex w-full gap-2 pt-10">
								<button
									onClick={toggleOpenCreateRecipe}
									className="w-1/2 flex  items-center justify-center  bg-white font-bold text-xl text-black p-4 rounded-xl hover:shadow-lg transition duration-300"
								>
									Cancel
								</button>
								<button
									onClick={toggleOpenCreateRecipe}
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

export default CreateRecipeCard;
