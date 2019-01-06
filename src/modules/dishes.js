import dishes from "../assets/dishes";

export function generateRandomList(numberOfdishes = 1) {
  if (numberOfdishes === "") {
    numberOfdishes = 1;
  } else {
    numberOfdishes = Number(numberOfdishes);
  }

  let list = {
    dishes: [],
    ingredients: {}
  };

  let alreadyAddeddishes = [];

  for (let i = 0; i < numberOfdishes; i++) {
    let dishIndex;

    do {
      // Get a random dish in list.
      dishIndex = Math.floor(Math.random() * dishes.length);

      // Make sure that the dish isn't already added to the list.
    } while (alreadyAddeddishes.indexOf(dishIndex) !== -1);

    alreadyAddeddishes.push(dishIndex);

    list = addDishToList(list, dishes[dishIndex]);
  }

  return list;
}

export function addDishToList(list, dish) {
  // Stop if dish has already been added to the list.
  if (list.dishes.indexOf(dish.name) !== -1) return list;

  // Add name
  list.dishes.push(dish.name);

  // Add ingredients to list.
  for (let i = 0; i < dish.ingredients.length; i++) {
    list = addIngredientTolist(list, dish.ingredients[i]);
  }

  return list;
}

export function deleteDishFromList(list, dishToDelete) {
  const dishToDeleteIndex = list.dishes.indexOf(dishToDelete);

  // Stop if dish doesn't exist.
  if (dishToDeleteIndex === -1) return list;

  // Remove dish name from array.
  list.dishes.splice(dishToDeleteIndex, 1);

  // Get original dish and ingredients object to use in deletion.
  const dishToDeleteObj = dishes.find(dish => dish.name === dishToDelete);

  // Remove ingredients to list.
  for (let i = 0; i < dishToDeleteObj.ingredients.length; i++) {
    const { type, name, amount } = dishToDeleteObj.ingredients[i];

    if (list.ingredients[type][name] > amount) {
      // There is another dish which needs the same ingredient.
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
