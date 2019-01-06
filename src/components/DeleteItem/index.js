import React, { Component } from "react";
import { Dropdown, Button } from "semantic-ui-react";

class DeleteItem extends Component {
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
        key: dishes[i],
        value: dishes[i],
        text: dishes[i]
      });
    }

    return (
      <div>
        <h2>Delete dish from list</h2>
        <p>Select dish to remove from the ingredients list</p>
        <Dropdown
          placeholder="Select dish"
          fluid
          search
          selection
          onChange={this.handleChange}
          options={organisedData}
        />
        <br />
        <Button fluid color="orange" onClick={this.handleSubmit}>
          Remove dish from list
        </Button>
      </div>
    );
  }
}

export default DeleteItem;
