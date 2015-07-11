'use strict';

var PreSuf = require('../'),
    Assert = require('assert')

var ok  = Assert.ok.bind(Assert),
    eql = Assert.deepEqual.bind(Assert)

var testSubjects = {
  strings : [ 'a', 'b', 'c' ],
  numbers : [ 0, new Buffer('0'), { } ]
}

describe('PreSuf', function describePreSuf () {
  describe('prefix', function describePrefix () {
    it('returns empty on falsy input', function falsy () {
      var result = PreSuf.prefix(null)

      ok(result.length === 0)
    })

    it('converts string input to an array of it\'s characters', function truthyS () {
      var result = PreSuf.prefix(testSubjects.strings.join(''), 'a')

      eql(result, [ 'aa', 'ab', 'ac' ])
    })

    it('converts buffer input to an array of it\'s JSON data', function truthyB () {
      var buffer = new Buffer(1),
          data   = buffer.toJSON().data,
          result = PreSuf.prefix(buffer, 'a')

      eql(result, data.map(function map (i) {
        return 'a' + String(i)
      }))
    })

    it('stringifies truthy non-string prefixes', function stringification1 () {
      var result = PreSuf.prefix(testSubjects.strings, true)

      eql(result, [ 'truea', 'trueb', 'truec' ])
    })

    it('stringifies non-string collection members', function stringification2 () {
      var result = PreSuf.prefix(testSubjects.numbers, 'a')

      eql(result, [ 'a0', 'a0', 'a[object Object]' ])
    })

    it('simply appends otherwise', function simple () {
      var result = PreSuf.prefix(testSubjects.strings, 'a')

      eql(result, [ 'aa', 'ab', 'ac' ])
    })
  })

  describe('suffix', function describeSuffix () {
    it('returns empty on falsy input', function falsy () {
      var result = PreSuf.suffix(null)

      ok(result.length === 0)
    })

    it('converts string input to an array of it\'s characters', function truthyS () {
      var result = PreSuf.suffix(testSubjects.strings.join(''), 'a')

      eql(result, [ 'aa', 'ba', 'ca' ])
    })

    it('converts buffer input to an array of it\'s JSON data', function truthyB () {
      var buffer = new Buffer(1),
          data   = buffer.toJSON().data,
          result = PreSuf.suffix(buffer, 'a')

      eql(result, data.map(function map (i) {
        return String(i) + 'a'
      }))
    })

    it('stringifies truthy non-string suffixes', function stringification1 () {
      var result = PreSuf.suffix(testSubjects.strings, true)

      eql(result, [ 'atrue', 'btrue', 'ctrue' ])
    })

    it('stringifies non-string collection members', function stringification2 () {
      var result = PreSuf.suffix(testSubjects.numbers, 'a')

      eql(result, [ '0a', '0a', '[object Object]a' ])
    })

    it('simply prepends otherwise', function simple () {
      var result = PreSuf.suffix(testSubjects.strings, 'a')

      eql(result, [ 'aa', 'ba', 'ca' ])
    })
  })
})
