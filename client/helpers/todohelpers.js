Template.main.helpers ({
    'urlpath': function (){
      return Router.current().location.get().path;
    }
  });

Template.todos.helpers({
    'todo': function(){
        var id = this._id
        var currentUser = Meteor.userId();
        return Todos.find({listId: id, createdBy: currentUser}, {sort: {createdAt: -1}});
    }
  });

Template.todoItem.helpers({
    'checked': function(){
        var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        } else {
            return "";
        }
    }
  });

Template.todosCount.helpers({
    'totalTodos': function(){
      return Todos.find({}).count();
    },
    'completedTodos': function(){
      return Todos.find({ completed: true }).count();
    }
  });
  
Template.lists.helpers({
    'list': function(){
        var currentUser = Meteor.userId(); 
        return Lists.find({createdBy: currentUser}, {sort: {name: 1}});
    }
  });