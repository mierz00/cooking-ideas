import recipes from "../assets/recipes";

export function generateRandomList(numberOfRecipes = 1) {
  if (numberOfRecipes === "") {
    numberOfRecipes = 1;
  } else {
    numberOfRecipes = Number(numberOfRecipes);
  }

  let list = {
    recipes: [],
    ingredients: {}
  };

  let alreadyAddedRecipes = [];

  for (let i = 0; i < numberOfRecipes; i++) {
    let recipeIndex;

    do {
      // Get a random recipe in list.
      recipeIndex = Math.floor(Math.random() * recipes.length);

      // Make sure that the recipe isn't already added to the list.
    } while (alreadyAddedRecipes.indexOf(recipeIndex) !== -1);

    alreadyAddedRecipes.push(recipeIndex);

    //   console.log(recipes[recipeIndex])

    list = addRecipeToList(list, recipes[recipeIndex]);
  }

  return list;
}

export function addRecipeToList(list, recipe) {
  // Add name
  list.recipes.push(recipe.name);

  // Add ingredients to list.
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const { type, name, amount } = recipe.ingredients[i];

    // Checks if type exists in list
    if (checkNested(list.ingredients, type)) {
      // Checks if ingredient name exists in list
      if (checkNested(list.ingredients, type, name)) {
        list.ingredients[type][`${name}`] += amount;
      }
      // Add ingredient name and amount to list.
      else {
        list.ingredients[type][`${name}`] = amount;
      }
    } else {
      // Type and name not already stored in list. Create both.
      list.ingredients[type] = {};
      list.ingredients[type][name] = amount;
    }
  }

  return list;
}

function checkNested(obj /*, level1, level2, ... levelN*/) {
  var args = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}
