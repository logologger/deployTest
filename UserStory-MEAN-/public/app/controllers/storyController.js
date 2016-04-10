angular.module('StoryController',['storyService'])

.controller('storyController',function(story)
           {
    var vm=this;
    
    story.allStory()
    .success(function(data)
            {
        vm.stories=data;
    });
    
    vm.createStory=function(){
        
        
        story.create(vm.storyData)
        .success(function(data){
            vm.storyData='';
            vm.message=data.message;
            
              vm.stories.push(data);
        });
    };
    
  
    
    
    
})