'use strict'

/*!
 * imports.
 */

var selectn = require('selectn')

/*!
 * exports.
 */

module.exports = expressions

/**
 * Creates and returns an array of expression objects.
 *
 * Example:
 *
 *  {
 *    predicate: 'received',
 *    element: 'received',
 *    compare: true
 *  }
 *
 *  {
 *    predicate: isBoolean,
 *    element: true
 *  }
 *
 *  {
 *    predicate: 'message.read',
 *    element: { message: { read: true } }
 *  }
 *
 * @param {Function|String|Object} predicate
 * Unary function, RegExp, dot/bracket-notation string path, and compound query object.
 *
 * @param {Array} list
 * Array to iterate over.
 *
 * @return {Array}
 * New array containing items from given array for which predicate returns true.
 */

function expressions (predicate, element) {
  var expressions = []

  if (isFunction(predicate) || isRegExp(predicate) || isString(predicate)) {
    expressions.push({predicate: predicate, element: element})
  } else {
    for (var key in predicate) {
      expressions.push({predicate: predicate[key], element: selectn(key, element), compare: true})
    }
  }

  return expressions
}

/**
 * Whether predicate is a RegExp instance.
 *
 * @param {*} predicate
 * Predicate value to test.
 *
 * @return {Boolean}
 * Whether predicate is a RegExp instance.
 */

function isRegExp (predicate) {
  return ({}).toString.call(predicate) === '[object RegExp]'
}

/**
 * Whether predicate is a function.
 *
 * @param {*} predicate
 * Predicate value to test.
 *
 * @return {Boolean}
 * Whether predicate is a function.
 */

function isFunction (predicate) {
  return ({}).toString.call(predicate) === '[object Function]'
}

/**
 * Whether predicate is a string.
 *
 * @param {*} predicate
 * Predicate value to test.
 *
 * @return {Boolean}
 * Whether predicate is a string.
 */

function isString (predicate) {
  return ({}).toString.call(predicate) === '[object String]'
}
