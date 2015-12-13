/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');
var yelp = require("node-yelp");

var client = yelp.createClient({
  oauth: {
  consumer_key: 'e4Ebgqyj7xw38k_v7qqcjA',
  consumer_secret: 'hCcUFLG8YVCOcXuLkU-kIPpNkfo',
  token: 'zNC8tDj_4QAUie27I3vNLP7WKPOpFwhV',
  token_secret: 'aFi7Wc_hcCiyCQ4w_kjBfURKFYw'
  }
});

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated =_.extend(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

function barjson(data){
  return{
    name:data.name,
    snippet_text:data.snippet_text,
    image_url:data.image_url,
    rating: data.rating
  }
}

// Gets a list of Things
exports.index = function(req, res) {
  Thing.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of bars
exports.getbars = function(req, res) {
  client.search({
    category_filter:'bars',
    location: "Warsaw"
  })
    //.then(responseWithResult(res))
  .then(function(data){
      var resbars = _.map(data.businesses, barjson);
      console.log(resbars);
      return res.status(200).json(resbars);
      //responseWithResult(data);
    }
    )
  .catch(handleError(res));
};

// Gets a single Thing from the DB
exports.show = function(req, res) {
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Thing in the DB
exports.create = function(req, res) {
  Thing.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Thing in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  Thing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
