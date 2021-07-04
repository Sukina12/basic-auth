'use strict';

const base64 = require('base-64');
const bcrypt =require ('bcrypt');

const User = require('../models/user-model');

const basicAuth = async(req,res,next) => {
  try {
    let encoded = req.headers.authorization.split(' ')[1];
    let decoded = base64.decode(encoded);
    let [username,password] = decoded.split(':');
    let user = await User.findOne({username});
    if(user){
      let isValid = await bcrypt.compare(password,user.password);
      if(isValid){
        req.user = user;
        next();
      } else {
        next ('Wrong SigningIn');
      }
    } else{
      res.status(401).json ({error : 'The User Does not Exist'});
    }
  } catch (error){
    res.status(401).json ({error : ErrorEvent.message});
  }
};

module.exports = basicAuth;
