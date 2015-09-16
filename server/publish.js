// server code goes here
Meteor.publish('lists', function(){
    //here we are doing this.userId for retrieving id of the curently logged in user not Meteor.userid
    var currentUser = this.userId;
    return Lists.find({ createdBy: currentUser });
});

Meteor.publish('todos', function(currentList){
    var currentUser = this.userId;
    return Todos.find({createdBy:currentUser, listId:currentList});
});

Meteor.publish('books', function(){
    return Books.find({});
})