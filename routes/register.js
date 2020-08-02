const {Router} = require('express');
const {body, validationResult} = require('express-validator');
const User = require('../services/user');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler')
const router = new Router();
const Email = require('../services/email');

router.get('/',function getLogin(req,res){
    res.render('register');
});

router.post('/',[
    body('email')
    .isEmail()
    //.normalizeEmail()
    .custom(async function(email){
        const found = await User.findUserByEmail(email);
        if(found){
            throw Error('User exists');
        }
        return true;
    }),
    body('displayName')
    .trim()
    .notEmpty(),
    body('password')
    .isLength({min:6 }),
],asyncHandler(async function (req,res){
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('register', {errors: errors.array()});
    }
  const user = await User.create({
      email : req.body.email,
      displayName : req.body.displayName,
      password : User.hashPassword(req.body.password),
      token: crypto.randomBytes(3).toString('hex').toUpperCase(),
    });
    console.log('test');

    await Email.send(user.email,'Mã kích hoạt tài khoản', `${process.env.BASE_URL}/login/${user.id}/${user.token}`);
    res.redirect('/');
}));


module.exports= router;

