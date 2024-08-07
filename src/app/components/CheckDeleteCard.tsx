import { FC } from "react";
import { FaXmark, FaTriangleExclamation } from "react-icons/fa6";
import axios from "axios";

interface CheckDeleteCardProps {
	toggleOpenDeleteCard: (id: string | null) => void;
	openDeleteCard: boolean;
	selectedRecipeId: string | null;
	refreshRecipes: () => void;
}
const CheckDeleteCard: React.FC<CheckDeleteCardProps> = ({
	toggleOpenDeleteCard,
	openDeleteCard,
	selectedRecipeId,
	refreshRecipes,
}) => {
	const handleDelete = async () => {
		if (selectedRecipeId) {
			try {
				await axios.delete(`api/recipes/${selectedRecipeId}`);
				refreshRecipes();
				toggleOpenDeleteCard(null);
			} catch (error) {
				console.log("Failed to delete recipe", error);
			}
		}
	};

	return (
		<>
			{openDeleteCard && (
				<section className="z-50 fixed inset-0 flex items-center justify-center bg-black/50">
					<article className="absolute top-28 bg-white z-50 p-5 rounded-lg w-full md:w-2/3 xl:w-1/3">
						<section className="relative w-full flex flex-col items-center justify-center gap-3 px-0 md:px-10">
							<div className="bg-red-500 w-20 h-20 flex items-center justify-center rounded-full">
								<FaTriangleExclamation className="text-4xl text-white" />
							</div>
							<h1 className="font-bold text-2xl">Delete Recipe</h1>
							<FaXmark
								className="absolute right-0 top-0 text-neutral-600 text-xl hover:cursor-pointer"
								onClick={() => toggleOpenDeleteCard(null)}
							/>
							<div className="flex flex-col md:flex-row justify-center items-center w-full gap-2 pt-10">
								<button
									onClick={() => toggleOpenDeleteCard(null)}
									className="flex w-full items-center justify-center bg-white font-bold text-xl text-black p-4 rounded-xl hover:shadow-lg transition duration-300 mx-2"
								>
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="flex w-full items-center justify-center bg-red-500 font-bold text-xl text-white p-4 rounded-xl hover:bg-red-600 hover:shadow-lg transition duration-300 mx-2"
								>
									Delete
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
