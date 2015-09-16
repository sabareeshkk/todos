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