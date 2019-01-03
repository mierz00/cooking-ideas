import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";

class AddItem extends Component {
  state = {
    recipe: ""
  };

  handleChange = (e, { value }) => this.setState({ recipe: value });

  handleSubmit = () => {
    this.props.onSubmit(this.state.recipe);
  };

  render() {
    let organisedData = [];
    const { recipes, onSubmit } = this.props;
    for (let i in recipes) {
      organisedData.push({
        key: recipes[i].name,
        value: recipes[i].name,
        text: recipes[i].name
      });
    }

    return (
      <div>
        <h2>Add recipes to list</h2>
        <p>Select recipes to add to the ingredients list</p>
        <Dropdown
          placeholder="Select recipe"
          fluid
          search
          selection
          onChange={this.handleChange}
          options={organisedData}
        />
        <br />
        <Button fluid color="teal" onClick={this.handleSubmit}>
          Add recipe to list
        </Button>
      </div>
    );
  }
}

export default AddItem;
