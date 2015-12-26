
//console.log("created model");
/*var todo=new Todo({
  
 task:'Chautala'
  
});
var todo1=new Todo({
  
 task:'Kaash Aap hote '
  
  
});*/
//console.log("created collection");
  // var new_task;
  //Backbone saves the reference of models  instances so that you can use them anywhere in any js file
  //while the same is not true for any javascript variable
  
  
       var todolist_to_be_saved_to_storage;
var todolist=new TodoList(
  
    );

//console.log("added the data to the model "+todo.get('name'));

//todo.save();
//todo1.save();
todolist.fetch();

console.log("fetching from  the localStorage");

//this.todolist.add(todo,todo1);
var fixView=new fixedView({
  
  
});

console.log(fixView.render().el);

$('#container').html(fixView.render().el);
var appView=new AppView({
  
  collection:todolist
  
});

appView.render();

