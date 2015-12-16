'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BarSchema = new Schema({
  name_id: String,
  name: String,
  url: String,
  snippet_text: String,
  image_url: String,
  peoples: []
});

module.exports = mongoose.model('Bar', BarSchema);
