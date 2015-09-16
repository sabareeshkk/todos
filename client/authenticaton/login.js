Template.login.onRendered(function(){
    var validator = $('.login-form').validate({
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