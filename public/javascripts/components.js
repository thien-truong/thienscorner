function range(numberOfItems) {
  return Array.apply(null, Array(numberOfItems)).map(function(_, i) { return i; });
}

var PageHeader = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Thien's Corner</h1>
        <nav>
          <ul>
            <li><ReactRouter.Link to="/recipes">Recipes</ReactRouter.Link></li>
            <li><ReactRouter.Link to="/about">About</ReactRouter.Link></li>
          </ul>
        </nav>
      </div>
    );
  }
});

var RecipeForm = React.createClass({
  getInitialState: function(){
    return (
      {title:'', instructions: [], numberOfInstructions: 2, ingredients:[], numberOfIngredients: 2}
    );
  },
  onChangeInstruction: function(instruction, index){
    var instructions = this.state.instructions;
    instructions[index] = {instruction: instruction};
    this.setState({instructions: instructions});
  },
  onChangeIngredientQuantity: function(quantity, index){
    var ingredients = this.state.ingredients;
    if (!ingredients[index]) {
      ingredients[index] = {}
    }
    ingredients[index].quantity = quantity;
    this.setState({ingredients: ingredients});
  },
  onChangeIngredientUnitOfMeasurement: function(unitOfMeasurement, index) {
    var ingredients = this.state.ingredients;
    if (!ingredients[index]) {
      ingredients[index] = {}
    }
    ingredients[index].unit = unitOfMeasurement;
    this.setState({ingredients: ingredients});
  },
  onChangeIngredientName: function(name, index) {
    var ingredients = this.state.ingredients;
    if (!ingredients[index]) {
      ingredients[index] = {}
    }
    ingredients[index].name = name;
    this.setState({ingredients: ingredients});
  },
  onChangeTitle: function(event){
    this.setState({title:event.target.value})
  },
  handleSubmit: function(event){
    event.preventDefault();
    Actions.addRecipe({
      title: this.state.title,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions});
    this.setState({title: '', ingredients: [], instructions: []});
    range(this.state.numberOfInstructions).map(function(instructionKey) {
      this.refs['instruction_' + instructionKey].clear();
    }, this);
    range(this.state.numberOfIngredients).map(function(ingredientKey) {
      this.refs['ingredient_' + ingredientKey].clear();
    }, this);
    this.setState({numberOfIngredients: 2});
    this.setState({numberOfInstructions: 2});
  },
  handleAddAnotherInstruction: function(){
    this.setState({numberOfInstructions: this.state.numberOfInstructions + 1});
  },
  handleAddAnotherIngredient: function(){
    this.setState({numberOfIngredients: this.state.numberOfIngredients + 1});
  },
  render: function(){
    var instructionKeys = range(this.state.numberOfInstructions);
    var ingredientKeys = range(this.state.numberOfIngredients);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title
            <input type='text' value={this.state.title} onChange={this.onChangeTitle}></input>
          </label>
          <fieldset>
            <legend>Ingredients</legend>
            {ingredientKeys.map(function(ingredientKey) {
              return <IngredientInRecipeForm key={ingredientKey}
                                             index={ingredientKey}
                                             ref={'ingredient_' + ingredientKey}
                                             addAnIngredientQuantity={this.onChangeIngredientQuantity}
                                             addAnIngredientUnitOfMeasurement={this.onChangeIngredientUnitOfMeasurement}
                                             addAnIngredientName={this.onChangeIngredientName}
              />;
            }, this)}
            <button type='button' onClick={this.handleAddAnotherIngredient}>Add Another Ingredient</button>
          </fieldset>
          <fieldset>
            <legend>Instructions</legend>
            {instructionKeys.map(function(instructionKey) {
              return <InstructionInRecipeForm key={instructionKey}
                                              index={instructionKey}
                                              ref={'instruction_' + instructionKey}
                                              addAnInstruction={this.onChangeInstruction} />;
            }, this)}
            <button type='button' onClick={this.handleAddAnotherInstruction}>Add Another Instruction</button>
          </fieldset>
          <input type='submit' value='Submit Recipe'></input>
        </form>
      </div>
    );
  }
});

var IngredientInRecipeForm = React.createClass({
  getInitialState: function() {
    return {quantity: null, unitOfMeasurement: '', name: ''}
  },
  clear: function() {
    this.setState({quantity: null});
    this.setState({unitOfMeasurement: ''});
    this.setState({name: ''});
  },
  onChangeQuantity: function(event){
    var updatedIngredientQuantity = event.target.value;
    this.setState({quantity: updatedIngredientQuantity});
    this.props.addAnIngredientQuantity(updatedIngredientQuantity, this.props.index);
  },
  onChangeUnitOfMeasurement: function(event){
    var updatedUnitOfMeasurement = event.target.value;
    this.setState({unitOfMeasurement: updatedUnitOfMeasurement});
    this.props.addAnIngredientUnitOfMeasurement(updatedUnitOfMeasurement, this.props.index);
  },
  onChangeName: function(event){
    var updatedName = event.target.value;
    this.setState({name: updatedName});
    this.props.addAnIngredientName(updatedName, this.props.index);
  },
  render: function(){
    return (
      <div>
        <input type='text' value={this.state.quantity} onChange={this.onChangeQuantity}></input>
        <input type='text' value={this.state.unitOfMeasurement} onChange={this.onChangeUnitOfMeasurement}></input>
        <input type='text' value={this.state.name} onChange={this.onChangeName}></input>
      </div>
    )
  }
});

var InstructionInRecipeForm = React.createClass({
  getInitialState: function() {
    return {instruction: ''};
  },
  clear: function(){
    this.setState({instruction: ''});
  },
  onChangeInstruction: function(event) {
    var updatedInstruction = event.target.value;
    this.setState({instruction: updatedInstruction});
    this.props.addAnInstruction(updatedInstruction, this.props.index);
  },
  render: function() {
    return (
      <div>
        <input type='text' value={this.state.instruction} onChange={this.onChangeInstruction}></input>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>
        This is about me
      </div>
    );
  }
});

var RecipesHome = React.createClass({
  render: function() {
    return (
      <div>
        <RecipeList />
      </div>
    );
  }
});

var RecipeList = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return { data: recipeStore.getRecipeData() };
  },
  onAddRecipe: function(recipeData){
    this.setState({data: recipeData})
  },
  componentDidMount: function() {
    this.listenTo(recipeStore, this.onAddRecipe);
  },
  render: function() {
    var recipeNodes = this.state.data.map(function(recipe, index) {
      return (
        <div>
          <li>
            <ReactRouter.Link to={"/recipes/" + index}>{recipe.title} </ReactRouter.Link>
          </li>
        </div>
      )
    });
    return (
      <div>
        <h1>Recipes</h1>
        {recipeNodes}
      </div>
    );
  }
});

var Recipe = React.createClass({
  getInitialState: function() {
    return { data: recipeStore.getRecipeData()};
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var recipeId = this.context.router.getCurrentParams().recipeId;
    var recipe = this.state.data[recipeId];
    return (
      <div>
        <h1>{recipe.title}</h1>
        <h2>Ingredients:</h2>
        <IngredientList ingredients={recipe.ingredients} />
        <h2>Instructions:</h2>
        <p>{recipe.instructions}</p>
        <br/>
      </div>
    );
  }
});

var IngredientList = React.createClass({
  render: function(){
    var ingredientNodes = this.props.ingredients.map(function (ingredient, index) {
      return (
        <Ingredient
          key={index}
          quantity={ingredient.quantity}
          unitOfMeasurement={ingredient.unit}
          name={ingredient.name}
        />
      )
    });
    return (
      <div>
        <ul>{ingredientNodes}</ul>
      </div>
    );
  }
});

var Ingredient = React.createClass({
  render: function() {
    return (
      <div>
        <li>
          {this.props.quantity}
          {this.props.unitOfMeasurement}
          {this.props.name}
        </li>
      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <header>
          <PageHeader />
        </header>
        <main>
          <ReactRouter.RouteHandler />
        </main>
      </div>
    );
  }
});

var routes = (
  <ReactRouter.Route path="/" handler={App}>
    <ReactRouter.Route path="about" handler={About} />
    <ReactRouter.Route path="admin" handler={RecipeForm} />
    <ReactRouter.Route path="recipes" handler={RecipesHome} />
    <ReactRouter.Route path="recipes/:recipeId" handler={Recipe} />
    <ReactRouter.DefaultRoute handler={RecipesHome} />
  </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app-container'));
});
