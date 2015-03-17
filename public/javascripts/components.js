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
    return { data: recipeData };
  },
  render: function() {
    var recipeNodes = this.state.data.map(function(recipe, index) {
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
  render: function() {
    return (
      <div>
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

var routes = (
  <ReactRouter.Route name="app" path="/" handler={App}>
    <ReactRouter.Route name="recipes" handler={RecipesHome} />
    <ReactRouter.Route name="about" handler={About} />
    <ReactRouter.DefaultRoute handler={RecipesHome} />
  </ReactRouter.Route>
);


ReactRouter.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app-container'));
});