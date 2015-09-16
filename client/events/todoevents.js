Template.navigation.events({
    "click .logout": function(event){
      event.preventDefault();
      Meteor.logout(function (){
        Router.go('login');
      });
    }
  });
Template.addTodo.events({
    "submit .todo1": function (event){
      event.preventDefault();
      var todoName = $('[name="todoName"]').val();
      var currentList = this._id;
      var currentUser = Meteor.userId();
      Meteor.call('createtodo', currentList, todoName);
      $('[name="todoName"]').val('');
    }
  });

Template.todoItem.events({
    "click .delete-todo": function (event){
      event.preventDefault();
      var confirm = window.confirm("Delete this task?");
      if (confirm){
        var documentId = this._id;
       /* Todos.remove({ _id: documentId });*/
       Meteor.call('todoremove', documentId);
      }
    },
    "keyup .save-todo": function (event){
      var documentId = this._id;
      if(event.which == 13 || event.which == 27){
        $(event.target).blur();
      }
      else{
        var todoItem = $(event.target).val();  
        /*Todos.update({ _id: documentId }, {$set: { name: todoItem }});*/
        Meteor.call('todoupdatename', documentId, todoItem);
        console.log("Task changed to: " + todoItem);
      }
    },
    "change .completed": function (event){
      var documentId = this._id;
      var isCompleted = this.completed;
     /* Todos.update({ _id: documentId}, {$set: {completed: !isCompleted}});*/
     Meteor.call('todoupdate', documentId, isCompleted);
    }
  });

Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      var currentUser = Meteor.userId();
      Meteor.call('createlist', listName, function (error, result){
        if (error){
          console.log("helloo");
        } else { 
        Router.go('listPage', {_id :result});
        }
      });
      $('[name=listName]').val('');
    }
  });