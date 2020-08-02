const Articles = require('../services/article');

function autharticle(req, res, next) {
    if (req.session.articlelist !== null) {
        res.locals.articlelist = req.session.articlelist;
    } else {
        res.locals.articlelist = [];
    }

    const article = req.body.article;
    if (article) {
       Articles.add(article);
    }

    req.articlelist = Articles.findAll();
    req.session.articlelist = Articles.findAll();
    res.locals.articlelist = req.session.articlelist;

    next();
}

module.exports = autharticle;