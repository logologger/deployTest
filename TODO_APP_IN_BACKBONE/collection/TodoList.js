var TodoList=Backbone.Collection.extend({
  model:Todo,
  localStorage:new Store('Session')
 
});