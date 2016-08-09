var _ = require('underscore');

module.exports = function(Account) {

  var models = null;


  _.extend(Account, {
    setAsAdmin: setAsAdmin
  });

  function setAsPassenger(cb) {

  }

  function setAsAdmin(userId, cb) {

    var model = Account.app.models;
    var Role = model.Role;
    var RoleMapping = model.RoleMapping;

    if (!userId) {
      cb("invalid user ID");
    }

    Role.findOne({
        name: 'Admin'
      })
      .then(function(role) {

        role.principals.create({
            principalType: role.name,
            principalId: userId
          })
          .then(function() {
            console.log('added user to auth');
            Account.findOne({where: {id: userId}, include: "RoleMapping"})
            .then(function(data){

              console.log('user rolemapping', JSON.stringify(data));
              cb(null, data);
            }, function(err){
              console.error(err);
              cb(err);
            })


          }, function(err) {
            console.error(err, "failed to add user to admin role");
            cb(null, {});
          })


      }, function(err) {
        debugger;

        cb(null)
      })

  }

  Account.remoteMethod('setAsAdmin', {
    http: {
      path: '/setAsAdmin',
      verb: 'post'
    },
    accepts: {
      arg: 'userId',
      type: "string"
    },
    returns: {
      arg: 'success',
      type: 'object'
    }
  })

};
