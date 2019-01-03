import React, { Component } from "react";
import "./App.css";
import * as Recipes from "./modules/recipes";
import recipesData from "./assets/recipes";
import { Input, Button } from "semantic-ui-react";
import { IngredientsList } from "./components/IngredientsList";
import AddItem from "./components/AddItem";

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

  render() {
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
          {this.state.ingredientsList.recipes.length > 0 && (
            <IngredientsList list={this.state.ingredientsList} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
