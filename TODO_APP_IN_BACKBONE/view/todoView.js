var TodoView=Backbone.View.extend({
  
  tagName:'p',
 
  
  className:'list_item_view',
  
  template:_.template($("#task_items").html()),
  initialize:function()
  {
    
    this.model.on('change',this.render,this);
    this.model.on('destroy',this.remove,this);
  },
  
  render:function()
  {
   this.$el.html(this.template(this.model.toJSON()));
    return this;
    
  },
  events:{
    'click .toggle':'toggle_clicked',
    'dblclick .task':'editable',
    'keypress .task':'save_the_edit',
    'click .delete':'delete_the_task'
    
    
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
   
  },
  delete_the_task:function()
  {
    alert("Are you sure about it !");
    //The main advantage of alert is that it will stop the execution here only and will wait 
    //unitl the user enter Ok otherwise it not delete the model
    this.model.destroy(
      {
        success:function()
        {
          
          console.log("deleted the model success");
         
         
        },
        error:function()
        {
          console.log("Sorry some error happened");
        }
        
        
        
      }
      );
    //this.render();
    
  }
  
  
  
});