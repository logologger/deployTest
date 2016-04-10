var app=angular.module("myApp",['mainController','authService','appRoutes','userCtrl','userService','storyService','StoryController'])

.config(function($httpProvider)
       {
    $httpProvider.interceptors.push('AuthInterceptor');
})