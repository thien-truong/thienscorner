var recipeData = [
  {title: "Zuppa Tuscana",
    ingredients: [
      {quantity: '1', unit: "cup", name: "celery"},
      {quantity: '2', unit: "cup", name: "fish"}
    ],
    instructions: [
      {instruction: "cook celery with fish"},
      {instruction: "add onion"}
    ]
  },
  {title: "Banana Bread",
    ingredients: [
      {quantity: '2', unit: "cup", name: "banana"},
      {quantity: '4', unit: "tbsp", name: "oil"}
    ],
    instructions: [
      {instruction: "mix banana and oil"},
      {instruction: "grin"}
    ]
  }
];

var recipeStore = Reflux.createStore({
  init: function(){
    // When Actions.addRecipe is fired, it calls addRecipe function, passing in the data given from the RecipeForm component
    this.listenTo(Actions.addRecipe, this.addRecipe);
  },
  addRecipe: function(recipe) {
    recipeData.push(recipe);
    this.trigger(recipeData);
  },
  getRecipeData: function() {
    return recipeData;
  }
});

var instructionStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.addAnInstruction, this.onAddAnInstruction);
  },
  onAddAnInstruction: function(instruction, index) {
    this.trigger(instruction, index);
  }
});
