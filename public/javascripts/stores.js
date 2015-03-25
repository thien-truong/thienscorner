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