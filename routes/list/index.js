var ArticleModel = require('../../libs/mongoose').ArticleModel;

exports.get = {
    handler: function (req, res, next) {
        res.json({
            data: '213131',
            name: "abson"
        })
    }
}

exports.GET = {
    params: 'id',
    handler: function (req, res, next) {
        return ArticleModel.find(function (err, articles) {
            if (!err) {
                return res.send(articles);
            } else {
                res.statusCode = 500;
                console.log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({
                    error: 'Server error'
                });
            }
        })
    }
}

exports.POST = {
    handler: function (req, res, next) {
        var article = new ArticleModel({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            images: req.body.images
        });
        article.save(function (err) {
            if (!err) {
                // log.info("article created");
                console.log("article created");
                return res.send({
                    status: 'OK',
                    article: article
                });
            } else {
                console.log(err);
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({
                        error: 'Validation error'
                    });
                } else {
                    res.statusCode = 500;
                    res.send({
                        error: 'Server error'
                    });
                }
                // log.error('Internal error(%d): %s', res.statusCode, err.message);
                console.log('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    }
}

exports.PUT = {
    params: 'id',
    handler: function (req, res, next) {
        return ArticleModel.findById(req.params.id, function (err, article) {
            if (!article) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }
            article.title = req.body.title;
            article.description = req.body.description;
            article.author = req.body.author;
            article.images = req.body.images;
            return article.save(function (err) {
                if (!err) {
                    log.info("article updated");
                    return res.send({
                        status: 'OK',
                        article: article
                    });
                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({
                            error: 'Server error'
                        });
                    }
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        });
    }
}

exports.DELETE = {
    params: 'id',
    handler: function (req, res, next) {
        return ArticleModel.findById(req.params.id, function (err, article) {
            if (!article) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }
            return article.remove(function (err) {
                if (!err) {
                    log.info("article removed");
                    return res.send({
                        status: 'OK'
                    });
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({
                        error: 'Server error'
                    });
                }
            });
        });
    }
}