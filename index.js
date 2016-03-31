'use strict'

/*!
 * imports.
 */

var curry2 = require('curry2')
var selectn = require('selectn')

/*!
 * imports (local).
 */

var expressions = require('./lib/expressions')

/*!
 * exports.
 */

module.exports = curry2(filter)

/**
 * Curried function deriving a new array containing items from given array for which predicate returns true.
 * Supports unary function, RegExp, dot/bracket-notation string path, and compound query object as predicate.
 *
 * @param {Function|RegExp|String|Object} predicate
 * Unary function, RegExp, dot/bracket-notation string path, and compound query object.
 *
 * @param {Array} list
 * Array to evaluate.
 *
 * @return {Array}
 * New array containing items from given array for which predicate returns true.
 */

function filter (predicate, list) {
  var end = list.length
  var idx = -1
  var out = []

  while (++idx < end) {
    if (matchall(expressions(predicate, list[idx]))) out.push(list[idx])
  }

  return out
}

/**
 * Whether all given expressions evaluate to true.
 *
 * @param {Array} expressions
 * Expressions to evaluate.
 *
 * @return {Boolean}
 * Whether all given expressions evaluate to true.
 */

function matchall (expressions) {
  var end = expressions.length
  var idx = -1
  var out = false

  while (++idx < end) {
    var expression = expressions[idx]

    if (({}).toString.call(expression.predicate) === '[object Function]') {
      out = !!expression.predicate(expression.element)
    } else if (({}).toString.call(expression.predicate) === '[object RegExp]') {
      out = !!expression.predicate.exec(expression.element)
    } else if (expression.compare) {
      out = expression.predicate === expression.element
    } else {
      out = selectn(expression.predicate, expression.element)
    }

    if (out === false) {
      return out
    }
  }

  return out
}
