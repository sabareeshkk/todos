Template.todos.helpers({
    'todo': function(){
        var id = this._id
        var currentUser = Meteor.userId();
        return Todos.find({listId: id, createdBy: currentUser}, {sort: {createdAt: -1}});
    }
  });