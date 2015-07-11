'use strict';

var isArray  = require('amp-is-array'),
    isString = require('amp-is-string')

var freeze   = Object.freeze.bind(Object),
    isBuffer = Buffer.isBuffer.bind(Buffer)

var NOOP_RESULT = []

function ensureArray (collection) {
  if (isArray(collection)) {
    return collection
  } else if (isBuffer(collection)) {
    return collection.toJSON().data
  } else {
    return Array.prototype.slice.call(collection)
  }
}

function ensureString (object) {
  if (!isString(object)) {
    return String(object)
  } else {
    return object
  }
}

function insert (collection, insertionM, isPrefix) {
  if (!collection) {
    return NOOP_RESULT
  }

  var insertion = ensureString(insertionM),
      array     = freeze(ensureArray(collection))

  return array.map(function insertEach (member) {
    var string = ensureString(member)

    if (isPrefix) {
      return insertion + string
    } else {
      return string + insertion
    }
  })
}

var PreSuf = {
  prefix : function prefix (collection, prefixS) {
    return insert(collection, prefixS, true)
  },

  suffix : function suffix (collection, suffixS) {
    return insert(collection, suffixS, false)
  }
}

module.exports = PreSuf
