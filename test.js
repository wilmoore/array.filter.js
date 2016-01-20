'use strict'

/*!
 * imports.
 */

var test = require('tape-catch')

/*!
 * imports (local).
 */

var filter = require('./')
var expressions = require('./lib/expressions')

/*!
 * fixtures.
 */

var datetime = [
  '2016-01-19T05:00:13.000Z',
  '2016-01-20T01:04:28.000Z',
  '2016-01-20T02:30:00.000Z'
]

var messages = [
  {
    id: 'cec375d7-8de9-4b43-ad7b-5979dc8f8bcd',
    body: {
      text: 'Hi',
      html: '<pre>Hi</pre>'
    },
    type: 'sent',
    date: '2016-01-19T05:00:13.000Z',
    read: true
  },
  {
    id: '808bda4a-4109-4c1e-a910-82f91b391f6e',
    body: {
      text: 'Hello, World!',
      html: '<pre>Hello, World!</pre>'
    },
    type: 'received',
    date: '2016-01-20T01:04:28.000Z',
    read: true
  },
  {
    id: 'd902a550-75f7-49ec-ad90-db7fdc6bb892',
    body: {
      text: '...'
    },
    type: 'sent',
    date: '2016-01-20T02:30:00.000Z',
    read: false
  }
]

/*!
 * tests.
 */

test('expressions()', function (t) {
  var fixture = messages[1]

  function lengthGt5 (element) {
    return element.length > 5
  }

  var regexp = /^2016-01-20/

  var compoundQuery = {
    date: regexp,
    type: 'received',
    'body.text': lengthGt5
  }

  t.deepEqual(expressions(compoundQuery, fixture), [
    { element: fixture.date, predicate: compoundQuery.date, compare: true },
    { element: fixture.type, predicate: compoundQuery.type, compare: true },
    { element: fixture.body.text, predicate: compoundQuery['body.text'], compare: true }
  ], 'compound query')

  t.deepEqual(expressions('body.text', fixture), [
    { element: fixture, predicate: 'body.text' }
  ], 'path string')

  t.deepEqual(expressions(lengthGt5, fixture), [
    { element: fixture, predicate: lengthGt5 }
  ], 'unary function')

  t.deepEqual(expressions(regexp, fixture), [
    { element: fixture, predicate: regexp }
  ], 'regular expression')

  t.end()
})

test('filter(fn)', function (t) {
  function predicate (element) {
    return element.type === 'received'
  }

  t.deepEqual(filter(predicate, messages), [
    messages[1]
  ], 'unary function returns match(es)')

  t.deepEqual(filter(function (element) {
    return element.blah === 'blah'
  }, messages), [], 'unary function returns no matches')

  t.end()
})

test('filter("read")', function (t) {
  t.deepEqual(filter('read', messages), [
    messages[0],
    messages[1]
  ], 'string path returns match(es)')

  t.deepEqual(filter('property-not-found', messages), [], 'string path returns no matches')

  t.end()
})

test('filter("body.html")', function (t) {
  t.deepEqual(filter('body.html', messages), [
    messages[0],
    messages[1]
  ], 'dot-notation string path returns match(es)')

  t.deepEqual(filter('property-not-found', messages), [
  ], 'dot-notation string path returns no matches')

  t.end()
})

test('filter(/RegExp/)', function (t) {
  t.deepEqual(filter(/^2016-01-20/, datetime), [
    datetime[1],
    datetime[2]
  ], 'regular expression returns match(es)')

  t.deepEqual(filter(/^$/, datetime), [
  ], 'regular expression returns no matches')

  t.end()
})

test('filter({ ... })', function (t) {
  t.deepEqual(filter({ date: /^2016-01-20/, type: 'received' }, messages), [
    messages[1]
  ], 'compound query object returns match(es)')

  t.deepEqual(filter({ domain: 'example.com' }, messages), [
  ], 'compound query object returns no matches')

  t.deepEqual(filter({}, messages), [
  ], 'empty compound query object returns no matches')

  t.end()
})
