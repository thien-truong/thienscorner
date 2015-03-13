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
        <Recipe key={index} title={recipe.title} />
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

var Recipe = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.title}
        <br/>

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
    instruction: "cook celery with fish"
  }
]

React.render(
  <RecipeBook data={recipeData} />, document.getElementById('app-container')
);
