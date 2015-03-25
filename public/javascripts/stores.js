var recipeData = [{
  title: "Zuppa Tuscana",
  ingredients: [
    {quantity: '1', unit: "cup", name: "celery"},
    {quantity: '2', unit: "cup", name: "fish"}
  ],
  instructions: [
    {instruction: "cook celery with fish"},
    {instruction: "add onion"}
  ]}, {
  title: "Banana Bread",
  ingredients: [
    {quantity: '2', unit: "cup", name: "banana"},
    {quantity: '4', unit: "tbsp", name: "oil"}
  ],
  instructions: [
    {instruction: "mix banana and oil"},
    {instruction: "grin"}
  ]}
];

var recipeStore = Reflux.createStore({
  init: function(){
    // When Actions.addRecipe is fired, it calls addRecipe function, passing in the data given from the RecipeForm component
    this.listenTo(Actions.addRecipe, this.onAddRecipe);
  },
  onAddRecipe: function(recipe) {
    recipeData.push(recipe);
    this.trigger(recipeData);
  },
  getRecipeData: function() {
    return recipeData;
  }
});

var ingredientQuantityInRecipeFormStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.addIngredientQuantity, this.onAddIngredientQuantity);
  },
  onAddIngredientQuantity: function(quantity, index){
    this.trigger(quantity, index);
  }
});

var ingredientUnitOfMeasurementInRecipeFormStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.addIngredientUnitOfMeasurement, this.onAddIngredientUnitOfMeasurement);
  },
  onAddIngredientUnitOfMeasurement: function(unitOfMeasurement, index) {
    this.trigger(unitOfMeasurement, index);
  }
});

var ingredientNameInRecipeFormStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.addIngredientName, this.onAddIngredientName);
  },
  onAddIngredientName: function(name, index) {
    this.trigger(name, index);
  }
});

var instructionInRecipeFormStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.addAnInstruction, this.onAddAnInstruction);
  },
  onAddAnInstruction: function(instruction, index) {
    this.trigger(instruction, index);
  }
});

var instructionFormStore = Reflux.createStore({
  init: function(){
    this.listenTo(Actions.addRecipe, this.onAddRecipe);
  },
  onAddRecipe: function() {
    this.trigger();
  }
});

var ingredientStore = Reflux.createStore({
  init: function(){
    this.listenTo(Actions.addRecipe, this.onAddRecipe);
  },
  onAddRecipe: function() {
    this.trigger();
  }
});