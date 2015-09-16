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
  Template.register.onRendered(function(){
    $('.register-form').validate({
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
  
  
  
  

