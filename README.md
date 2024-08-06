# Salad-maker Web App Project

## Overview

This web app, created by Kan Jittapramoulboon in 2024 using the Next.js framework and TypeScript, showcases my skills in fullstack development. The project utilizes MongoDB for the database. The initial UI design provided has been adjusted to enhance the user experience.

## Setup Instructions

1. Clone the Salad-maker project:
    ```bash
    git clone https://github.com/jittakan2539/salad-maker.git
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the project:
    ```bash
    npm run dev
    ```

## Approach

1. **Analysis:**
    - Analyzed the three main requirements and the provided Figma UI design along with the given .JSON to understand the project scope.
    - Main requirements:
        - **Ingredients Page:** All ingredients are fetched and can be categorized. New recipes can be created using the given ingredients.
        - **Recipes Page:** A list of all recipes can be seen. Users can delete or edit each recipe.
        - **Edit Recipe Page:** Redirects to the Edit Recipe page where users can change ingredient quantities or delete them.

2. **API and Database Design:**
    - Refer to [API and Database Design](https://drive.google.com/file/d/10xrXKo9kwOoOq-wliIkRpP61eQD9_lNB/view?usp=sharing) for details.
    - Database: Two collections - `ingredients` and `recipes`.
        - **Ingredients:** Stores ingredient name, picture path, category, and calories.
        - **Recipes:** Stores recipe name and ingredient details, including ingredientId and quantity.
    - API Endpoints:
        - `/api/ingredients`: Fetch ingredients.
        - `/api/recipes`: Create new recipes, get all recipes.
        - `/api/recipes/:recipeId`: Get recipe by recipeId (Edit Page), delete recipe by recipeId, update recipe (ingredient quantities).

3. **Frontend Design:**
    - Designed a rough frontend layout based on the analysis.
    - Created a database to store data as designed and built backend APIs, using Postman for testing.

4. **Frontend Functionalities:**
    - Organized the frontend layout and implemented functionalities to GET, POST, PATCH, and DELETE recipes and ingredients.
    - Added additional features to improve user experience:
        - **Reset Button:** Clears selected ingredients.
        - **Notifications:** Alerts for successful recipe creation and edits.
        - **Edit Recipe Page:**
            - Users can increase/decrease ingredient quantities.
            - Automatically deletes a recipe if all ingredients are removed.

## Reflections

- **Planning:** Organizing work ahead helps with project structure.
- **Flexibility:** Adjustments are necessary to improve functionality, particularly for the Edit Page, which required populating ingredientId with data from the Ingredients schema.

---

🎈 Thank you for reading. I hope you enjoy my project, and I wish you a pleasant day.

---
