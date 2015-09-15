Todos = new Meteor.Collection('todos');
Lists = new Meteor.Collection('lists');

if(Meteor.isClient){
    // client code goes here
  $.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
  });
  Template.main.helpers ({
    'urlpath': function (){
      return Router.current().location.get().path;
    }
  });
  /*Template.register.events({
     "submit form": function (event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var username = $('[name=username]').val();
        Accounts.createUser({
          username: username,
          password: password,
          email: email,
          profile: {
            name: username
          }
        }, function (error) {
          if(error){
            console.log(error.reason);
          } else {
          Router.go('home');
        }
        });
     }
  });*/
/* Template.login.events({
    "submit form": function(event){
      event.preventDefault();
      console.log("helooo"); 
    }
  });*/
  Template.navigation.events({
    "click .logout": function(event){
      event.preventDefault();
      Meteor.logout(function (){
        Router.go('login');
      });
    }
  });
  Template.login.onRendered(function(){
    var validator = $('.login').validate({
      submitHandler: function(event){
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
        if(error){
          if(error.reason == "User not found"){
            validator.showErrors({
            email: "That email doesn't belong to a registered user."   
            });
          }
          if(error.reason == "Incorrect password"){
            validator.showErrors({
            password: "You entered an incorrect password."    
            });
          }
        }
        else {
          Router.go("home");
        }
        });
      }
    });
  });
  Template.register.onRendered(function(){
    $('.register').validate({
      submitHandler: function (event){
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var username = $('[name=username]').val();
        Accounts.createUser({
          username: username,
          password: password,
          email: email,
          profile: {
            name: username
          }
        }, function (error) {
          if(error){
            if(error.reason == "Email already exists."){
              validator.showErrors({
                email: "That email already belongs to a registered user."   
              });
            }
          }
          else {
            Router.go('home');
        }
        });
     }
    });
  });
  Template.todos.helpers({
    'todo': function(){
        var id = this._id
        var currentUser = Meteor.userId();
        return Todos.find({listId: id, createdBy: currentUser}, {sort: {createdAt: -1}});
    }
  });
  Template.addTodo.events({
    "submit .todo1": function (event){
      event.preventDefault();
      var todoName = $('[name="todoName"]').val();
      var currentList = this._id;
      var currentUser = Meteor.userId();
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date(),
        listId: currentList,
        createdBy: currentUser
      });
      $('[name="todoName"]').val('');
    }
  });
  Template.todoItem.events({
    "click .delete-todo": function (event){
      event.preventDefault();
      var confirm = window.confirm("Delete this task?");
      if (confirm){
        var documentId = this._id;
        Todos.remove({ _id: documentId });
      }
    },
    "keyup .save-todo": function (event){
      var documentId = this._id;
      if(event.which == 13 || event.which == 27){
        $(event.target).blur();
      }
      else{
        var todoItem = $(event.target).val();  
        Todos.update({ _id: documentId }, {$set: { name: todoItem }});
        console.log("Task changed to: " + todoItem);
      }
    },
    "change .completed": function (event){
      var documentId = this._id;
      var isCompleted = this.completed;
      Todos.update({ _id: documentId}, {$set: {completed: !isCompleted}});
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
  Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      var currentUser = Meteor.userId();
      Lists.insert({
          name: listName,
          createdBy: currentUser
      }, function (error, result){
        if (error){
          console.log("helloo");
        } else { 
        Router.go('listPage', {_id :result});
        }
      });
      $('[name=listName]').val('');
    }
  });
  Template.lists.helpers({
    'list': function(){
        var currentUser = Meteor.userId(); 
        return Lists.find({createdBy: currentUser}, {sort: {name: 1}});
    }
});

}

if(Meteor.isServer){
    // server code goes here
}

Router.configure({
    layoutTemplate: 'main'
});

Router.route('register');
Router.route('login');
Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/lists', {
  name: 'lists',
  template: 'lists',
  onBeforeAction: function (){
    var currentUser = Meteor.userId();
    if (currentUser){
      this.next();
    } else {
      this.render('login');
    }
  },
  onRun: function(){
        console.log("You triggered 'onRun' for 'listPage' route.");
        this.next();
  },
  onRerun: function(){
        console.log("You triggered 'onRerun' for 'listPage' route.");
  },
  onAfterAction: function(){
        console.log("You triggered 'onAfterAction' for 'listPage' route.");
  },
  onStop: function(){
        console.log("You triggered 'onStop' for 'listPage' route.");
  }
});

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        var currentUser = Meteor.userId();
        return Lists.findOne({ _id: currentList, createdBy: currentUser});
    },
    onBeforeAction: function (){
      var currentUser = Meteor.userId();
      if (currentUser){
        this.next();
      } else {
        this.render("login");
      }
    }
});
