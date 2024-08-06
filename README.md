# Salad-maker Web App Project

## Web app created by Kan Jittapramoulboon in 2024, using Next.js framework and TypeScript.

This project is created to showcase my skills in fullstack development, using Next.js framework, Typescript and MongoDB for Database. The initlal UI design is provided, and adjusted to enhance better User Experience

## Setup Instructions:

1. Clone Salad-maker project.

```terminall
git clone https://github.com/jittakan2539/salad-maker.git
```

2. Install the dependencies required such as: axios, mongoose, etc.

```terminall
npm i
```

3. Run the project.

```terminall
npm run dev
```

## My brief approach to this project.

1. I analysed, first, the three main requirements and Figma UI design (together with the given .JSON), to better understand the scope.
   The main requirements are: -

   ✔️ Ingredients Page
        🔶 all ingredients are fetched and can be caegorized, and new recipes can be created, using the given ingredients.
   ✔️ Recipes Page
        🔶 the list of all recipes can be seen, and they can click to delete or edit each recipe
   ✔️ Edit Recipe Page
        🔶if users click "edit", I will redirect to Edit-Recipe, where they can change the ingredient quantity or delete them.

2. Design API and Database

Please refer to "https://drive.google.com/file/d/10xrXKo9kwOoOq-wliIkRpP61eQD9_lNB/view?usp=sharing" to see my initial API and database design

    With initial given JSON and analysis of the UI design, I went on to design API and database

    🎁Database: Two collections are necessary: ingredients and recipes
        🔶 Ingredients: the ingredients will store all data used in ingredient page, such as ingredient name, picture path, category and calories.
        🔶 Recipes: will store the recipe name and ingredient detail: ingredientId (used to connect with) and the quantity

    🎁API: separated into three main
        🔶 /api/ingredients          -- fetch ingredients
        🔶 /api/recipes              -- create new recipe, get all recipes
        🔶 /api/recipes/:recipeId    -- get the recipe by recipeId(in Edit Page), delete recipe by recipeId, and update recipe (ingredient quantities)

3. Then, I designed some rough frontend
4. I created database to store the data, as designed -- and created backend APIs, using Postman to check
5. Finally, I organised frontend layout, and created functionalities to GET, POST, PATCH and DELETE, as well as testing if their functionalities.

* Reflections: Despite the planning, I discovered that some part had to be adjusted to be able to work properly. Especially, the Edit Page, where it needs to populate ingredientId with data from Ingredients Schema. Some parts are adjusted to improve User experience such as: - I 
        🔸 Reset Button -- to clear selected ingredients.
        🔸 Set notifications if recipe is created successfully
        🔸 Set notifications if recipe is edited successfully.
        🔸 Edit Recipe: users can increase/decrease the quantities.
        🔸 Edit Recipe: if all ingredients are deleted -- that recipe will be automatically deleted.


The main lessons are that:-
        🏓 Plan the work ahead helps with organization.
        🏓 But do not hesitate to adjust to improve the functiona

🎈🎈Thank you for reading. Hope you enjoy my project, and I wish you a pleasant day.
    
