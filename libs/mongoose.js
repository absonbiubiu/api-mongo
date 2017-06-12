var mongoose = require('mongoose');
var config = require("./config");

var db = mongoose.connect(config.get('mongoose:uri'));

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
})
db.connection.on("open", function () {
    console.log("————————数据库连接成功————————");
})

var Schema = mongoose.Schema;

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

var Article = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [Images],
    modified: {
        type: Date,
        default: Date.now
    }
})

Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var ArticleModel = mongoose.model('Article', Article);
module.exports.ArticleModel = ArticleModel;