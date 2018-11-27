const passport = require('passport')
const GoogleOauth = require('passport-google-oauth20')

const credentials = require('./config.json')
const User = require('../db/models/user')

// Serialize User
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)))

passport.use(new GoogleOauth({
  // Credentials for Google OAuth
  callbackURL: credentials.google.redirect_uris[0],
  clientID: credentials.google.client_id,
  clientSecret: credentials.google.client_secret
}, (accessToken, refreshToken, profile, done) => {
  // Passport callback function
  User.findOne({googleId: profile.id}).then(currentUser => {
    // Check if User exists
    if (currentUser) {
      console.log('User is:', currentUser)
      done(null, currentUser)
    } else {
      // If user does not exist save new user
      const user = new User({
        username: profile.displayName,
        googleId: profile.id
      })
      user.save().then(newUser => {
        console.log('New User created:', newUser)
        done(null, newUser)
      })
    }
  })
}))