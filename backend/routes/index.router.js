const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
//const businessRoutes = express.Router();

// Require Business model in our routes module
let User = mongoose.model('User');

 
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/edit',function (req, res) {
    console.log("Check");
    let id = req.body._id;
    console.log(req.body._id);
    User.findOne({_id:id}, function (err, user){
        if(!err){
          res.status(200).json(user);
        }
    });
  });

router.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err,user) {
    
       user.fullName = req.body.fullName;
       user.email= req.body.email;

        user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    
  });
});
 
module.exports = router;