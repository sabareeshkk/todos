Template.navigation.events({
    "click .logout": function(event){
      event.preventDefault();
      Meteor.logout(function (){
        Router.go('login');
      });
    }
  });