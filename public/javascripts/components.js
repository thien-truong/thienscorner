var RecipesHome = React.createClass({
  render: function() {
    return (
      <div>
        <RecipeList data={this.props.data}/>
      </div>
    );
  }
});

var RecipeList = React.createClass({
  render: function() {
    var recipeNodes = this.props.data.map(function(recipe, index) {
      return (
        <RecipeLink
          key={index}
          title={recipe.title}
        />
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

var RecipeLink = React.createClass({
  handleClick: function() {
    Actions.route("/recipes/0")
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>
        {this.props.title}
        <br/>
      </div>
    );
  }
});

var Recipe = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <h3>Ingredients:</h3>
        <IngredientList ingredients={this.props.ingredients} />
        <h3>Instructions:</h3>
        <p>{this.props.instructions}</p>
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
  getInitialState: function() {
    return {currentRoute: "/recipes"};
  },
  onRoute: function(route){
    this.setState({
      currentRoute: route
    });
  },
  componentDidMount: function(){
    this.stopListening = routeStore.listen(this.onRoute);
  },
  componentWillUnmount: function(){
    this.stopListening();
  },
  render: function() {
    var content;
    if (this.state.currentRoute == "/recipes") {
      content = <RecipesHome data={recipeData} />;
    } else if (this.state.currentRoute == "/recipes/0") {
      content = <Recipe
        title={recipeData[0].title}
        ingredients={recipeData[0].ingredients}
        instructions={recipeData[0].instructions}
      />;
    }

    return (
      <main>
        {content}
      </main>
    );
  }
});

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
  }
];

React.render(
  <App />, document.getElementById('app-container')
);
