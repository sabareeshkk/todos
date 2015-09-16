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