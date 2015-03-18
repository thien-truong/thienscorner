var PageHeader = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Thien's Corner</h1>
        <nav>
          <ul>
            <li><ReactRouter.Link to="recipes">Recipes</ReactRouter.Link></li>
            <li><ReactRouter.Link to="about">About</ReactRouter.Link></li>
          </ul>
        </nav>
      </div>
    );
  }
});

var RecipeForm = React.createClass({
  getInitialState: function(){
    return (
      {recipeData: [], title:'', ingredients:[], instructions:[]}
    );
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
    this.setState({title: '', ingredients: '', instructions: ''});
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.title} onChange={this.onChangeTitle}></input>
          <button>Add</button>
        </form>
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
  getInitialState: function() {
    return { data: recipeStore.getRecipeData() };
  },
  onAddRecipe: function(recipeData){
    this.setState({data: recipeData})
  },
  componentDidMount: function() {
    this.unsubscribe = recipeStore.listen(this.onAddRecipe)
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    var recipeNodes = this.state.data.map(function(recipe, index) {
      return (
        <div>
          <li><ReactRouter.Link to="recipe">{recipe.title}</ReactRouter.Link></li>
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
    return { data: recipeData[0] };
  },
  render: function() {
    return (
      <div>
        <h1>{this.state.data.title}</h1>
        <h2>Ingredients:</h2>
        <IngredientList ingredients={this.state.data.ingredients} />
        <h2>Instructions:</h2>
        <p>{this.state.data.instructions}</p>
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
  <ReactRouter.Route name="app" path="/" handler={App}>
    <ReactRouter.Route name="recipes" handler={RecipesHome} />
    <ReactRouter.Route name="about" handler={About} />
    <ReactRouter.Route name="admin" handler={RecipeForm} />
    <ReactRouter.Route name="recipe" handler={Recipe} />
    <ReactRouter.DefaultRoute handler={RecipesHome} />
  </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app-container'));
});