/**
 * Controllers - category
 */
var Category = require('../proxy').Category;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var CategorySerializer = require('../serializers').CategorySerializer;

exports.retrieve = function(req, res, next) {
  Category.getCategory(req.uid, function(err, categorys) {
    if (err) {
      return next(err);
    }
    res.json(CategorySerializer.serialize(categorys));
  });
};