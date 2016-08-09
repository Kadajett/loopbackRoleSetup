module.exports = function(app){
  var Role = app.models.Role;

  createRoles(Role, function(){
    
  })
}

function createRoles(Role, cb){
  Role.create({name: 'Admin'})
  .then(function(){
    Role.create({name: 'Passenger'})
    .then(function(){
      cb();
    },
    function(err){
      console.error(err);
    });
  },
  function(err){
    console.error(err);
  });


}
