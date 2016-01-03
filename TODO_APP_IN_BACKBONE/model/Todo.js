var Todo=Backbone.Model.extend({
  defaults:{
    
    task:" ",
    completed:false,
    date:new Date()
    
    
  },
  
 toggle:function()
 {
   this.save({
        completed:!this.get('completed')
     });
 }

});