import React, { Component } from "react";
import "./App.css";
import * as dishes from "./modules/dishes";
import dishesData from "./assets/dishes";
import { Input, Button } from "semantic-ui-react";
import { IngredientsList } from "./components/IngredientsList";
import AddItem from "./components/AddItem";
import DeleteItem from "./components/DeleteItem";
import AddIngredient from "./components/AddIngredient";

class App extends Component {
  state = {
    numberOfDishes: "",
    ingredientsList: {
      dishes: [],
      ingredients: {}
    }
  };

  onSubmitRandomSelection = () => {
    const ingredientsList = dishes.generateRandomList(
      this.state.numberOfDishes
    );
    this.setState({ ingredientsList });
  };

  onSubmitAddItem = dishName => {
    const dishWithIngredients = dishesData.find(dish => dish.name === dishName);

    const ingredientsList = dishes.addDishToList(
      this.state.ingredientsList,
      dishWithIngredients
    );
    this.setState({ ingredientsList });
  };

  onSubmitAddIngredient = ingredient => {
    const ingredientsList = dishes.addIngredientTolist(
      this.state.ingredientsList,
      ingredient
    );

    console.log("lsit", ingredientsList);
    this.setState({ ingredientsList });
  };

  onSubmitDeleteDish = dishName => {
    const ingredientsList = dishes.deleteDishFromList(
      this.state.ingredientsList,
      dishName
    );
    this.setState({ ingredientsList });
  };

  render() {
    const { ingredientsList } = this.state;
    return (
      <div className="App">
        <div className="Container">
          <h2>Dishes</h2>
          <p>Generate ingredients list from a random selection of dishes.</p>
          <Input
            fluid
            focus
            type="number"
            step="1"
            value={this.state.numberOfDishes}
            placeholder="Enter number of dishes..."
            onChange={event => {
              this.setState({ numberOfDishes: event.target.value });
            }}
          />
          <br />
          <Button fluid color="blue" onClick={this.onSubmitRandomSelection}>
            Generate random list
          </Button>
          <br />
          <AddItem dishes={dishesData} onSubmit={this.onSubmitAddItem} />
          <br />

          {ingredientsList.dishes.length > 0 && (
            <div>
              <AddIngredient onSubmit={this.onSubmitAddIngredient} />
              <br />
              <IngredientsList list={ingredientsList} /> <br />
              <DeleteItem
                dishes={ingredientsList.dishes}
                onSubmit={this.onSubmitDeleteDish}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
