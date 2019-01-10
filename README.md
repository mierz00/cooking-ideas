# Cooking ideas

It's pretty common to ask the question "What can we cook tonight", or "What should I make for tomorrow". So to solve this issue, Cooking Ideas was created. The way it works is you can add various dishes to the app. Each dish is comprised of various ingredients and from there the app can create a specialised ingredients list for you. You can either generate a random list, add specific recipes and add specific ingredients.

## Installation

To install simply run

```bash
yarn install
# or
npm install
```

To publish your own version of the site on GitHub. Fork the repo and run

```bash
yarn predeploy
yarn deploy
```

## Usage

If you would like to edit the list of dishes head to

```bash
/src/assets/dishes.js
```

The list is in the format of

```javascript
[
  {
    name: "Zucchini lasagne",
    ingredients: [
      { type: "Vegetables", name: "Zucchini", amount: 4 },
      { type: "Vegetables", name: "Zucchini", amount: 4 },
      { type: "Refrigerated", name: "Mozzarella", amount: 1 }
    ]
  }
];
```

You can add what every time of category you like. This is used to make it easier when shopping.

## Todo

- Add feature to delete individual ingredients.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Feel free to use the repo as you like.

[MIT](https://choosealicense.com/licenses/mit/)
