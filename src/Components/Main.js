import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./AI";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...ingredients, newIngredient]);
    formEl.reset();
  }

  const [recipe, setRecipe] = React.useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. Oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button>Add ingredient</button>
      </form>
      {!ingredients.length && (
        <div className="ingredient-note">
          <p>Add atleast 4 ingredients*</p>
        </div>
      )}
      {ingredients.length > 0 && (
        <IngredientsList getRecipe={getRecipe} ingredients={ingredients} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
