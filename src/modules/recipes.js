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

    list = addRecipeToList(list, recipes[recipeIndex]);
  }

  return list;
}

export function addRecipeToList(list, recipe) {
  // Stop if recipe has already been added to the list.
  if (list.recipes.indexOf(recipe.name) !== -1) return list;

  // Add name
  list.recipes.push(recipe.name);

  // Add ingredients to list.
  for (let i = 0; i < recipe.ingredients.length; i++) {
    list = addIngredientTolist(list, recipe.ingredients[i]);
  }

  return list;
}

export function deleteRecipeFromList(list, recipeToDelete) {
  const recipeToDeleteIndex = list.recipes.indexOf(recipeToDelete);

  // Stop if recipe doesn't exist.
  if (recipeToDeleteIndex === -1) return list;

  // Remove recipe name from array.
  list.recipes.splice(recipeToDeleteIndex, 1);

  // Get original recipe and ingredients object to use in deletion.
  const recipeToDeleteObj = recipes.find(
    recipe => recipe.name === recipeToDelete
  );

  // Remove ingredients to list.
  for (let i = 0; i < recipeToDeleteObj.ingredients.length; i++) {
    const { type, name, amount } = recipeToDeleteObj.ingredients[i];

    if (list.ingredients[type][name] > amount) {
      // There is another recipe which needs the same ingredient.
      list.ingredients[type][name] -= amount;
    } else {
      // Delete the ingredient.
      delete list.ingredients[type][name];
    }
  }

  clearEmpties(list.ingredients);

  return list;
}

export function addIngredientTolist(list, ingredient) {
  const { type, name, amount } = ingredient;

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

function clearEmpties(o) {
  for (var k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue; // If null or not an object, skip to the next iteration
    }

    // The property is an object
    clearEmpties(o[k]); // <-- Make a recursive call on the nested object
    if (Object.keys(o[k]).length === 0) {
      delete o[k]; // The object had no properties, so delete that property
    }
  }
}
