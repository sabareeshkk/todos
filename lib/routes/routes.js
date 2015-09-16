Router.route('register');
Router.route('login');

Router.route('/', {
  name: 'home',
  template: 'home',
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
  },
  subscriptions: function(){
        return Meteor.subscribe('lists');
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
    },
    waitOn: function(){
        var currentList = this.params._id;
        return [ Meteor.subscribe('lists'), Meteor.subscribe('todos', currentList) ]
    }
});