var routeStore = Reflux.createStore({
  init: function() {
    this.listenTo(Actions.route, function(route) { this.trigger(route); });
  }
});
