import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";

class AddItem extends Component {
  state = {
    dish: ""
  };

  handleChange = (e, { value }) => this.setState({ dish: value });

  handleSubmit = () => {
    this.props.onSubmit(this.state.dish);
  };

  render() {
    let organisedData = [];
    const { dishes } = this.props;
    for (let i in dishes) {
      organisedData.push({
        key: dishes[i].name,
        value: dishes[i].name,
        text: dishes[i].name
      });
    }

    return (
      <div>
        <h2>Add dishes to list</h2>
        <p>Select dish to add to the ingredients list</p>
        <Dropdown
          placeholder="Select dish"
          fluid
          search
          selection
          onChange={this.handleChange}
          options={organisedData}
        />
        <br />
        <Button fluid color="teal" onClick={this.handleSubmit}>
          Add dish to list
        </Button>
      </div>
    );
  }
}

export default AddItem;
