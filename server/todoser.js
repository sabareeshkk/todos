Meteor.methods({
  createlist: function(listName) {
      //retrieve list for user
      var currentUser = Meteor.userId();
      return Lists.insert({ name: listName, createdBy: currentUser})
  },
  createtodo: function(currentList, todoName){
      var currentUser = Meteor.userId();
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date(),
        listId: currentList,
        createdBy: currentUser
      });
  },
  todoupdate: function(documentId, isCompleted){
      Todos.update({ _id: documentId}, {$set: {completed: !isCompleted}});
  },
  todoupdatename: function(documentId, todoItem){
      Todos.update({ _id: documentId }, {$set: { name: todoItem }});
  },
  todoremove: function(documentId){
      Todos.remove({ _id: documentId });
  }

});
