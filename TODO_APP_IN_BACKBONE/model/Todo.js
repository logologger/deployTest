var Todo=Backbone.Model.extend({
  defaults:{
    
    task:" ",
    completed:false
    
  },
  
 toggle:function()
 {
   this.save({
        completed:!this.get('completed')
     });
 }

});