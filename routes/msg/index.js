var MessageService = require('../../services/message');

exports.get = {
    handler: function (req, res, next) {
        var queryBody;
        if (req.query.author) {
            queryBody = {
                author: req.query.author
            };
        }

        var pageIndex = ~~req.query.pageIndex || 1,
            quantity = ~~req.query.quantity || 10;

        var pagingBody = {
            idx: pageIndex,
            quantity: quantity
        };

        res.json(MessageService.find({
            query: queryBody,
            paging: pagingBody
        }));
    }
}

