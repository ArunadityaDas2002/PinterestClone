var express = require('express');                          //index-login-profile-register-login-logout-isloggedin
var router = express.Router();
const path = require('path');
//aquiring the models here
const userModel = require('./users')
const postModel = require('./posts')
const passport = require('passport') //change made
const upload = require('./multer')

// these 2 lines help help in login
const localStrategy = require('passport-local') //change made
passport.use(new localStrategy(userModel.authenticate())) //change made

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
  // console.log(req.flash("error"))
  res.render('login',{ error: req.flash('error') }); //remember that error is an array
  // res.send("profile")
});

router.get('/profile', isloggedin, async function(req, res, next){
  const user = await userModel.findOne({
    username : req.session.passport.user,
    // fullname : req.session.passport.fullname
  }).populate("posts")
  console.log(user); // Log the entire session object
  res.render('profile',{user})
})

router.get('/feed', isloggedin, function(req, res, next){
  res.render('feed')
})

router.post('/upload', isloggedin,upload.single('file') , async (req, res) =>{ //here theupload.single("") name inside should be same as given in input field in profile.ejs
  if(!req.file){
    return res.status(400).send("No files were uploaded")
  }
  // res.send("Files uploaded successfully")
  const user = await userModel.findOne({username : req.session.passport.user})
  const postData = await postModel.create({
    image: req.file.filename,
    text: req.body.postCaption,
    user: user._id
  })
  user.posts.push(postData._id)
  await user.save()
  res.redirect('/profile')
})

router.post('/register', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const { username, fullname, email } = req.body;
const userData = new userModel({ username, fullname, email });

  userModel.register(userData, req.body.password).
  then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile')
    })
  })
});

router.post('/login', passport.authenticate("local", {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}), function(req, res){
//  res.redirect('/profile');
})

router.get('/logout', function(req,res,next){
  req.logOut(function(err){
    if(err){return next(err)}
    res.redirect('/login')
  })
})

console.log(__dirname)
function isloggedin(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login?error=notloggedin");
}

// router.get('/createuser', async function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   const usercreated = await userModel.create({
//     username: "ArunadityaDas12",
//     password: "Arun",
//     posts: [],
//     fullname: "Arunaditya Das",
//     email: "Barun122@gmail.com"
//   })
//   res.send(usercreated)
// });

// router.get('/allusers', async function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   var regex = new RegExp("",'i')
//   let user = await userModel.find(({
//     username: regex
//   }))
//   res.send(user)
// });

// router.get('/alluserposts', async function(req, res, next) {
//   let user = await userModel.findOne({_id: "65e2a5c8dd75739e467c9207"})
//   .populate('posts')
//   res.send(user)
// });

// router.get('/createpost', async function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   let postcreated = await postModel.create({
//     text: "hey this is my 2 post",
//     user: "65e2a5c8dd75739e467c9207" //this user id states this post is created by this user with user id : 65e00756094a9225ff84ef1a
//   })
//   let user = await userModel.findOne({_id : "65e2a5c8dd75739e467c9207"})
//   user.posts.push(postcreated._id)
//   user.save() 
//   res.send("done")
// });

module.exports = router;
