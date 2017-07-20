var user = {};
var userId = user.id,
user.username = STRING,
user.password = STRING
user.displayname = STRING 

    sequelize model:create --name User --attributes 'name:string email:string bio:text'

var message = {};
var messageId = message.id
message.value = STRING     varchar(140)
message.userId
message.likeId
   

var like = {};
var likeId = like.id
like.userId
like.messageId



Functionality
    register
    log in 
    log out
    view all messages ordered by newest
    create new message
    delete one message of your own
    like a message
    see who liked a message 

models.message.hasMany(models.like);  
models.message.belongsTo(models.user);  

models.like.belongsTo(models.user);
models.like.hasOne(models.message);  
  
models.user.hasMany(models.message);
models.user.hasMany(models.like);