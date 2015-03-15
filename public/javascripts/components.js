var RecipeBook = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Recipes</h1>
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
        <h2>Recipe List</h2>
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
        {this.props.title}
        {this.props.ingredients}
        {this.props.instructions}
        <br/>
      </div>
    );
  }
});

var ContentSection = React.createClass({
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
      content = <RecipeBook data={recipeData} />;
    } else if (this.state.currentRoute == "/recipes/0") {
      content = <Recipe
        title={recipeData[0].title}
        ingredients={recipeData[0].ingredients}
        instructions={recipeData[0].instructions}
      />;
    }

    return (
      <section>
        {content}
      </section>
    );
  }
});

var recipeData = [
  {title: "Zuppa Tuscana",
   ingredients: [
     {quantity: '1', unit: "cup", name: "celery"},
     {quantity: '2', unit: "cup", name: "fish"}
   ],
    instructions: "cook celery with fish"
  }
];

React.render(
  <ContentSection />, document.getElementById('app-container')
);
