var User=require('../models/user');
var Story=require('../models/story');
var config=require('../../config');
var secretKey=config.secretKey;

var jsonwebtoken=require('jsonwebtoken');
function createToken(user)
{
   var token= jsonwebtoken.sign({
       id:user._id,
        name:user.name,
        username:user.userName
        
    },secretKey,
                     {  
        expiresInMinute:1440
    });
    return token;
    
}

module.exports=function(app,express)
{
    var api=express.Router();
    api.post('/signup',function(req,res)
            {
       
        var user=new User({
            
            name:req.body.name,
            userName:req.body.username,
            password:req.body.password
            
        });//create the User pbject
      
        
        var token=createToken(user);
        console.log(user.userName);
        //save the User JSON object in the database
        user.save(function(err)
                 {
           
            if(err)
                {
//                    res.json({"message":"Error in connecting to database"});
                    console.log("There is error in saving to database");
                    res.send(err);
                    return;
                }
           
                res.json({
                    "success":true,
                    "message":"User has been created",
                    "token":token
                });
           
        });
        
        
        
        
    });
    api.get('/users',function(req,res)
           {
        User.find({},function(err,users)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            res.json(users);
                
            
        });
        
    });
    api.post('/login',function(req,res)
           {
       
        User.findOne({
            userName:req.body.username
        }).select('name userName password').exec(function(err,user)
         {
            console.log("user"+user);
            
            if(err)
                throw err;
            if(!user){
                res.send({"message":"User doesnt Exist"});
            }
            else if(user)
                {
                    var validPassword=user.comparePassword(req.body.password);
                   if(!validPassword)
                       {
                          res.send({"message":"Password Doesnt Match"}); 
                           
                       }
                    else{
                      //token here  
                        var token=createToken(user);
                        res.json({
                           success:true,
                            message:"Successfully logged in",
                            token:token
                            
                        });
                    }
                }
        });
    });
    api.use(function(req,res,next)
           {
        console.log("Somebody Came to our api");
        var token=req.body.token || req.param('token') || req.headers['x-access-token'];
        if(token)
            {
                jsonwebtoken.verify(token,secretKey,function(err,decoded)
                                   {
                    if(err)
                        {
                        res.status(403).send({success:false,message:"wrong Token"})    
                        }
                    else{
                        req.decoded=decoded;
                        next();
                    }
                });
            }
        else{
            res.status(403).send({success:false,message:"No token found"});
        }
    });
   api.route('/')
   .post(function(req,res)
        {
       var story=new Story({
           
           creator:req.decoded.id,
           content:req.body.content
       });
       story.save(function(err)
                 {
           if(err)
               {
                   res.send(err);
                   return;
               }
           res.json({message:"Story created Successfully"});
       });
       
   })
    .get(function(req,res)
        {
        Story.find({
            creator:req.decoded.id
        },function(err,stories)
                  {
            if(err)
                {
                    res.send(err);
                    return;
                }
          res.json(stories);  
        });
    });
    api.get('/me',function(req,res)
           {
        
       res.json(req.decoded); 
    });
    
    return api;
}