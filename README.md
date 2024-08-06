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
   = all ingredients are fetched and can be caegorized, and new recipes can be created, using the given ingredients.
   ✔️ Recipes Page - the list of all recipes can be seen, and they can click to delete or edit each recipe
   ✔️ Edit Recipe Page
   if users click "edit", I will redirect to Edit-Recipe, where they can change the ingredient quantity or delete them.

2. Design API and Database

Please refer to "https://drive.google.com/file/d/10xrXKo9kwOoOq-wliIkRpP61eQD9_lNB/view?usp=sharing" to see my initial API and database design

    With initial given JSON and analysis of the UI design, I went on to design API and database

    🎁Database: Two collections are necessary: ingredients and recipes
        🔶 Ingredients: the ingredients will store all data used in ingredient page, such as ingredient name, picture path, category and calories.
        🔶 Recipes: will store the recipe name and ingredient detail: ingredientId (used to connect with) and the quantity

    🎁API: separated into three main
        🔶 /api/ingredients -- fetch ingredients
        🔶 /api/recipes     -- create new recipe, get all recipes
