const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const bcyprt = require('bcryptjs');
//login page
router.get('/login', (req, res) => res.render('login'));
//register page
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];
    
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please enter all the fields!'})
    }
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
    
      if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else{
          //Register Passed
        User.findOne({email: email})
           .then(user => {
             if(user){
               //User exists
               errors.push({msg:'Email is already registered'});
               res.render('register',{
                 errors,
                 name,
                 email,
                 password,
                 password2  
               }); 
             } else{
               const newUser = new User({
                 name,
                 email,
                 password
               });
               //Hash Password
               bcyprt.genSalt(10, (err, salt) => {
                 bcyprt.hash(newUser.password, salt, (err, hash) => {
                   if(err) throw err;
                   //Set password to hashed
                   newUser.password = hash;
                   //save user
                  newUser.save()
                    .then(user =>
                      {req.flash('success_msg', 'You are registered and can login now')
                      res.redirect('/users/login')})
                    .catch(err => console.log(err));
                 })
               })
             }
            })
      }
})

//login handler
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//logout handler
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;