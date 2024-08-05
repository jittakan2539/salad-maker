import { FC, useState, useEffect, useCallback } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";

interface CreateRecipeCardProps {
	toggleOpenCreateRecipe: () => void;
	openCreateRecipe: boolean;
	ingredientQuantities: { [key: string]: number };
}
const CreateRecipeCard: React.FC<CreateRecipeCardProps> = ({
	toggleOpenCreateRecipe,
	openCreateRecipe,
	ingredientQuantities,
}) => {
	const [recipeName, setRecipeName] = useState("");
	const [createRecipeSuccess, setCreateRecipeSuccess] = useState<
		boolean | null
	>(null);
	const [countdown, setCountdown] = useState<number | null>(null);

	const handleSubmit = async () => {
		try {
			const ingredientDetail = Object.entries(ingredientQuantities).map(
				([ingredientId, quantity]) => ({ ingredientId, quantity })
			);

			const response = await axios.post(`/api/recipes`, {
				recipeName,
				ingredientDetail,
			});

			console.log("Recipe created successfully", response.data);
			setCreateRecipeSuccess(true);
			setCountdown(8);
		} catch (error) {
			console.log("Error creating a new recipe:", error);
			setCreateRecipeSuccess(false);
		}
	};

	const closeRecipeandClearNotify = useCallback(() => {
		toggleOpenCreateRecipe();
		setCreateRecipeSuccess(null);
		setCountdown(null);
		setRecipeName("");
	}, [toggleOpenCreateRecipe]);

	useEffect(() => {
		if (countdown === null) return;

		if (countdown === 0) {
			closeRecipeandClearNotify();
			return;
		}

		const timer = setTimeout(() => {
			setCountdown((prevCountdown) =>
				prevCountdown !== null ? prevCountdown - 1 : null
			);
		}, 1000);

		return () => clearTimeout(timer);
	}, [countdown, closeRecipeandClearNotify]);

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
								value={recipeName}
								onChange={(event) => setRecipeName(event.target.value)}
							/>
							{createRecipeSuccess === true && (
								<span className="flex flex-col items-center">
									<p className="font-bold text-lg text-green-500">
										New Recipe Created.
									</p>
									<p className="font-normal text-md text-neutral-500">
										This will close in {countdown} sec. <br />
									</p>
								</span>
							)}
							{createRecipeSuccess === false && (
								<span className="flex flex-col items-center">
									<p className="font-bold text-lg text-red-500">
										Unable to create new recipe <br />
									</p>
								</span>
							)}

							<FaXmark
								className="absolute right-0 top-0 text-neutral-600 text-xl hover:cursor-pointer"
								onClick={closeRecipeandClearNotify}
							/>
							<div className="flex w-full gap-2 pt-10">
								<button
									onClick={closeRecipeandClearNotify}
									className="w-1/2 flex  items-center justify-center  bg-white font-bold text-xl text-black p-4 rounded-xl hover:shadow-lg transition duration-300"
								>
									Cancel
								</button>
								<button
									onClick={handleSubmit}
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
