Template.todoItem.events({
    "click .delete-todo": function (event){
      event.preventDefault();
      var confirm = window.confirm("Delete this task?");
      if (confirm){
        var documentId = this._id;
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
        Meteor.call('todoupdatename', documentId, todoItem);
        console.log("Task changed to: " + todoItem);
      }
    },
    "change .completed": function (event){
      var documentId = this._id;
      var isCompleted = this.completed;
     Meteor.call('todoupdate', documentId, isCompleted);
    }
  });