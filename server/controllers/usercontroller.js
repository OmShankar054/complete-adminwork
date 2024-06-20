
const User = require('../model/user') //including user schema
const  mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/user');





/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const messages = await req.flash("info");  
    const locals =
    {
      title: 'Admin Paage',
      description: 'Project work'
    }

    try {
      const users=  await User.find({}).limit(10);
      res.render('index', {locals, messages, users} );

    } catch (error) {
      console.log(error);
    }
}

/**
 * GET /
 * new user form
 */

exports.addUser = async (req, res) => {
  
  const locals ={
   title: 'Add new user',
  description: 'User accoarding to the project'
}

res.render("users/add", locals );

}


/**
 * POST /
 * Create new user
 */

exports.postUser = async (req, res) => {

  console.log(req.body);   // helps to show data or get data from form

  const newUser = new User({
     firstName: req.body.firstName,  //grabbing data from req.body
     lastName: req.body.lastName,
     details: req.body.details,
     tel: req.body.tel,
     email: req.body.email,
     usertype: req.body.usertype,
     district: req.body.district,
     block: req.body.block,
     panchayat: req.body.panchayat,
     password: req.body.password
  });
   
  try{

     await User.create(newUser);
     await req.flash('info', 'New User has been added')

     res.redirect('/'); // go to dashboard
  }
  catch(error)
  {
    console.log(error);
  }

}

/**
 * GET /
 * User data 
 */

exports.view = async (req, res) => {
   
  try {
   const user = await User.findOne({ _id: req.params.id }) //grabbing it from id

   const locals ={
    title: ' View USer data',
   description: 'User accoarding to the project'
 };

  res.render('users/view', {
    locals, 
    user
  })

  }
   
  catch(error) {
    console.log(error);
  }

}


/**
 * GET /
 * User data 
 */

exports.edit = async (req, res) => {
   
  try {
   const user = await User.findOne({ _id: req.params.id }) //grabbing it from id

   const locals ={
    title: ' Edit  USer data',
   description: 'User accoarding to the project'
 };

  res.render('users/edit', {
    locals, 
    user
  })

  }
   
  catch(error) {
    console.log(error);
  }

}

/**
 * GET /
 *  Update User data 
 */

exports.editPost = async (req, res) => {

  try{
    await User.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      usertype: req.body.usertype,
      district: req.body.district,
      block: req.body.block,
      panchayat: req.body.panchayat,
      password: req.body.password,

      updatedAt: Date&TimeRanges.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);
    console.log("redirected");
  } catch (error) {
    console.log(error);
  }

}
  

/**
 * DELETE /
 *  Delete User data 
 */

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


