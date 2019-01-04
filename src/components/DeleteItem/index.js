import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";

class DeleteItem extends Component {
  state = {
    recipe: ""
  };

  handleChange = (e, { value }) => this.setState({ recipe: value });

  handleSubmit = () => {
    this.props.onSubmit(this.state.recipe);
  };

  render() {
    let organisedData = [];
    const { recipes } = this.props;
    for (let i in recipes) {
      organisedData.push({
        key: recipes[i],
        value: recipes[i],
        text: recipes[i]
      });
    }

    return (
      <div>
        <h2>Delete recipe from list</h2>
        <p>Select recipe to remove from the ingredients list</p>
        <Dropdown
          placeholder="Select recipe"
          fluid
          search
          selection
          onChange={this.handleChange}
          options={organisedData}
        />
        <br />
        <Button fluid color="orange" onClick={this.handleSubmit}>
          Remove recipe from list
        </Button>
      </div>
    );
  }
}

export default DeleteItem;
