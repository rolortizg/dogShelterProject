const passport         = require('passport');
const FacebookStrategy = require('passport-facebook');
const User             = require('../models/User');
// const Facebook = require('../models/Facebook')

passport.use(new FacebookStrategy({
  clientID: "243309239830410",
  clientSecret: "da05f9012965030f77722cf0f3b2c333",
  callbackURL: "http://localhost:3000/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.create({ name:profile.displayName,lastName:profile.displayName, username: profile.displayName, password:"123",email:"facebook@user.com",active:true }, function (err, user) {
   
    
    if (err) { return cb(err); }
    cb(null, user);
  });
}
));

passport.serializeUser(function(user,cb){
  cb(null, user)
});

passport.deserializeUser(function(user,cb){
  cb(null, user)
})  

module.exports = passport;