var RecipeBook = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Recipe List</h1>
        <RecipeList />
      </div>
    );
  }
});

var RecipeList = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Recipe List</h2>
      </div>
    );
  }
});

var Recipe = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.title}
      </div>
    );
  }
});

React.render(
  <RecipeBook />, document.getElementById('app-container')
);
