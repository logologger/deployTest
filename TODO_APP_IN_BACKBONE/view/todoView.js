var TodoView=Backbone.View.extend({
  
  tagName:'p',
 
  
  className:'list_item_view',
  
  template:_.template($("#task_items").html()),
  initialize:function()
  {
    
    this.model.on('change',this.render,this);
    
  },
  
  render:function()
  {
   this.$el.html(this.template(this.model.toJSON()));
    return this;
    
  },
  events:{
    'click .toggle':'toggle_clicked',
    'dblclick .task':'editable',
    'keypress .task':'save_the_edit'
    
    
  },
  toggle_clicked:function()
  {
    this.model.toggle();
  
  
  
  },
  editable:function()
  {
    console.log("Ok you double clicked");
    this.$('.task').attr('contenteditable',true);
    
    
    
  },
  save_the_edit:function(e)
  {
 
    if(e.which==13)
    {
         console.log($(e.target).text());
    this.model.save({
      task:$(e.target).text()
     
    });
     $('.task').attr('contenteditable',false);
    }
   
  }
  
  
  
});