const User = require('../services/user');
const {Router} = require('express');
const Article = require('../services/article');
const asyncHandler = require('express-async-handler');
const router = new Router();


router.get('/', asyncHandler(async function (req,res){
    const articlelist = await Article.findAllArticles();
    req.session.views = (req.session.views || 0)+1;
    res.render('index',{views: req.session.views, user: req.currentUser,articlelist});
 }));

module.exports = router;
// function (req,res){
    // req.session.views = (req.session.views || 0)+1;
    // const user = User.findUserById(req.session.userId);
    // res.render('index',{views: req.session.views, user: req.currentUser});

