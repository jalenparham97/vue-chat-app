const passport = require('passport')
const router = require('express').Router()

// Auth Login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

// Auth Logout
router.get('/logout', (req,res) => {
  // Handle with passport
  req.logout()
  res.redirect('/')
})

// Auth Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// Callback Redirect Route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profile')
})

module.exports = router
