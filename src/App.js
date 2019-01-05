import React, { Component } from "react";
import "./App.css";
import * as Recipes from "./modules/recipes";
import recipesData from "./assets/recipes";
import { Input, Button } from "semantic-ui-react";
import { IngredientsList } from "./components/IngredientsList";
import AddItem from "./components/AddItem";
import DeleteItem from "./components/DeleteItem";
import AddIngredient from "./components/AddIngredient";

class App extends Component {
  state = {
    numberOfRecipes: "",
    ingredientsList: {
      recipes: [],
      ingredients: {}
    }
  };

  onSubmitRandomSelection = () => {
    const ingredientsList = Recipes.generateRandomList(
      this.state.numberOfRecipes
    );
    this.setState({ ingredientsList });
  };

  onSubmitAddItem = recipeName => {
    const recipeWithIngredients = recipesData.find(
      recipe => recipe.name === recipeName
    );

    const ingredientsList = Recipes.addRecipeToList(
      this.state.ingredientsList,
      recipeWithIngredients
    );
    this.setState({ ingredientsList });
  };

  onSubmitAddIngredient = ingredient => {
    const ingredientsList = Recipes.addIngredientTolist(
      this.state.ingredientsList,
      ingredient
    );

    console.log("lsit", ingredientsList);
    this.setState({ ingredientsList });
  };

  onSubmitDeleteRecipe = recipeName => {
    const ingredientsList = Recipes.deleteRecipeFromList(
      this.state.ingredientsList,
      recipeName
    );
    this.setState({ ingredientsList });
  };

  render() {
    const { ingredientsList } = this.state;
    return (
      <div className="App">
        <div className="Container">
          <h2>Recipes</h2>
          <p>Generate ingredients list from a random selection of recipes.</p>
          <Input
            fluid
            focus
            type="number"
            step="1"
            value={this.state.numberOfRecipes}
            placeholder="Enter number of recipes..."
            onChange={event => {
              this.setState({ numberOfRecipes: event.target.value });
            }}
          />
          <br />
          <Button fluid color="blue" onClick={this.onSubmitRandomSelection}>
            Generate random list
          </Button>
          <br />
          <AddItem recipes={recipesData} onSubmit={this.onSubmitAddItem} />
          <br />

          {ingredientsList.recipes.length > 0 && (
            <div>
              <AddIngredient onSubmit={this.onSubmitAddIngredient} />
              <br />
              <IngredientsList list={ingredientsList} /> <br />
              <DeleteItem
                recipes={ingredientsList.recipes}
                onSubmit={this.onSubmitDeleteRecipe}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
