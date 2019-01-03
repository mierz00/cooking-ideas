import React, { Component } from "react";
import "./App.css";
import * as Recipes from "./modules/recipes";
import { Input, Button } from "semantic-ui-react";
import { IngredientsList } from "./components/IngredientsList";

class App extends Component {
  state = {
    numberOfRecipes: "",
    ingredientsList: null
  };

  onSubmitRandomSelection = () => {
    const ingredientsList = Recipes.generateRandomList(
      this.state.numberOfRecipes
    );
    console.log(ingredientsList);
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
              console.log(event.target.value);
              this.setState({ numberOfRecipes: event.target.value });
            }}
          />
          <br />
          <Button fluid color="blue" onClick={this.onSubmitRandomSelection}>
            Submit
          </Button>
          <br />
          {this.state.ingredientsList && (
            <IngredientsList list={this.state.ingredientsList} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
