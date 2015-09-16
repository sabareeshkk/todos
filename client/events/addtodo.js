Template.addTodo.events({
    "submit #todo1": function (event){
      event.preventDefault();
      var todoName = $('[name="todoName"]').val();
      var currentList = this._id;
      var currentUser = Meteor.userId();
      Meteor.call('createtodo', currentList, todoName);
      $('[name="todoName"]').val('');
    }
  });