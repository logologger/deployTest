angular.module('storyService',[])

.factory('story',function($http)
        {
    
    var storyFactory={};
    
    storyFactory.create=function(storyData){
        return $http.post('/api',storyData)
        
        
    }
    
    storyFactory.allStory=function(){
        
        return $http.get('/api');
    }
    
    return storyFactory;
});