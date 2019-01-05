import React, { Component } from "react";
import { Input, Select, Button } from "semantic-ui-react";

class AddIngredient extends Component {
  state = {
    types: [
      "Vegetables",
      "Refrigerated",
      "Spices",
      "Cans",
      "Flour",
      "Bakery",
      "Asian",
      "Bio",
      "Pasta"
    ],
    ingredient: "",
    selectedType: "",
    amount: ""
  };

  handleIngredientChange = event =>
    this.setState({ ingredient: event.target.value });
  handleAmountChange = event => this.setState({ amount: event.target.value });
  handleTypeChange = (e, { value }) => this.setState({ selectedType: value });

  handleSubmit = () => {
    const { ingredient, selectedType, amount } = this.state;
    this.props.onSubmit({ name: ingredient, type: selectedType, amount });
  };

  render() {
    let organisedTypes = [];
    let { types, ingredient, amount } = this.state;

    types = types.sort();

    for (let i in types) {
      organisedTypes.push({
        key: types[i],
        value: types[i],
        text: types[i]
      });
    }

    return (
      <div>
        <h2>Add individual ingredient to list</h2>
        <p>Enter an ingredient and select a type to add it to the list.</p>
        <Input type="text" fluid placeholder="Enter ingredient" action>
          <input onChange={this.handleIngredientChange} />
          <Select
            compact
            options={organisedTypes}
            defaultValue="other"
            onChange={this.handleTypeChange}
          />
        </Input>
        <br />
        <Input
          fluid
          focus
          type="number"
          step="1"
          value={amount}
          placeholder="Enter amount"
          onChange={this.handleAmountChange}
        />
        <br />
        <Button fluid color="green" onClick={this.handleSubmit}>
          Add ingredient to list
        </Button>
      </div>
    );
  }
}

export default AddIngredient;
