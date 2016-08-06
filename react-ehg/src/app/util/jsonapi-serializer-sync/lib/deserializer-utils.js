'use strict';
var _ = require('lodash');
var Inflector = require('./inflector');

module.exports = function (jsonapi, data, opts) {
  function isComplexType(obj) {
    return _.isArray(obj) || _.isPlainObject(obj);
  }

  function getValueForRelationship(relationshipData, included) {
    if (opts && relationshipData && opts[relationshipData.type]) {
      var valueForRelationshipFct = opts[relationshipData.type]
        .valueForRelationship;

      return valueForRelationshipFct(relationshipData, included);
    } else {
      return included;
    }
  }

  function findIncluded(relationshipData) {
    if (!jsonapi.included || !relationshipData) { return null; }

    var included = _.findWhere(jsonapi.included, {
      id: relationshipData.id,
      type: relationshipData.type
    });

    if (included) {
      var attributes = extractAttributes(included);
      var relationships = extractRelationships(included);
      return _.extend(attributes, relationships);
    } else {
      return null;
    }
  }

  function keyForAttribute(attribute) {
    if (_.isPlainObject(attribute)) {
      return _.transform(attribute, function (result, value, key) {
        if (isComplexType(value)) {
          result[keyForAttribute(key)] = keyForAttribute(value);
        } else {
          result[keyForAttribute(key)] = value;
        }
      });
    } else if (_.isArray(attribute)) {
      return attribute.map(function (attr) {
        if (isComplexType(attr)) {
          return keyForAttribute(attr);
        } else {
          return attr;
        }
      });
    } else {
      if (_.isFunction(opts.keyForAttribute)) {
        return opts.keyForAttribute(attribute);
      } else {
        return Inflector.caserize(attribute, opts);
      }
    }
  }

  function extractAttributes(from) {
    var dest = keyForAttribute(from.attributes || {});
    if ('id' in from) { dest.id = from.id; }

    return dest;
  }

  function extractRelationships(from) {
    if (!from.relationships) { return; }

    var dest = {};

    Object.keys(from.relationships).forEach(function(key) {
      var relationship = from.relationships[key];
      if (relationship.data === null) {
          dest[keyForAttribute(key)] = null;
        } else if (_.isArray(relationship.data)) {
          var includes = [];
          relationship.data.forEach(function (relationshipData) {
            includes.push(extractIncludes(relationshipData));
          });
          if (includes) { dest[keyForAttribute(key)] = includes; }
        } else {
          var include = extractIncludes(relationship.data);
          if (include) { dest[keyForAttribute(key)] = include; }
        }
    });

    return dest;
  }

  function extractIncludes(relationshipData) {
    var included = findIncluded(relationshipData);
    var valueForRelationship = getValueForRelationship(relationshipData, included);
    return valueForRelationship;
  }

  this.perform = function () {
    var attributes = extractAttributes(data);
    var relationships = extractRelationships(data);
    return _.extend(attributes, relationships);
  };

};
