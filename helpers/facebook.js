const passport         = require('passport');
const FacebookStrategy = require('passport-facebook');
const User             = require('../models/User');
const findOrCreate = require('mongoose-findorcreate');


passport.use(new FacebookStrategy({
  clientID: "243309239830410",
  clientSecret: "da05f9012965030f77722cf0f3b2c333",
  callbackURL: "https://sleepy-lowlands-81745.herokuapp.com/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOne({email:profile.displayName + "@user.com"})
  .then(r=>{
    console.log(r)
    if(r === null) {
      User.create({ name:profile.displayName,lastName:profile.displayName, username: profile.displayName, password:"123",email:profile.displayName + "@user.com",active:true }, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
      });
    } else {
      cb(null, r);
    }
  })
  .catch(e=>console.log(e))
  
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
})  

module.exports = passport;