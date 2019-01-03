import React from "react";
import "./styles.css";
import { Segment } from "semantic-ui-react";

export const IngredientsList = ({ list }) => {
  return (
    <div>
      <h2>Ingredients List</h2>
      <Segment>
        <h3>Recipes</h3>
        <ul>
          {list.recipes.map(recipe => (
            <li key={recipe}>{recipe}</li>
          ))}
        </ul>
        <h3>Ingredients by Category</h3>
        {Object.keys(list.ingredients).map((type, index) => (
          <div>
            <h4 style={{ margin: 0 }}>{type}</h4>
            <table cellspacing="0" style={{ width: "100%" }}>
              {Object.keys(list.ingredients[type]).map((item, index) => (
                <tr>
                  <td className="bottomBorder">{item}</td>
                  <td
                    className="bottomBorder"
                    style={{
                      textAlign: "right"
                    }}
                  >
                    {list.ingredients[type][item]}
                  </td>
                </tr>
              ))}
            </table>
            <br />
          </div>
        ))}
      </Segment>
    </div>
  );
};
