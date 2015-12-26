var TodoView=Backbone.View.extend({
  
  tagName:'li',
  
  className:'list_item_view',
  
  template:_.template($("#task_items").html()),
  
  render:function()
  {
   this.$el.html(this.template(this.model.toJSON()));
    return this;
    
  }
  
  
  
});