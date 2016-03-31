# array.filter
> Curried function deriving a new array containing items from given array for which predicate returns true. Supports unary function, RegExp, dot/bracket-notation string path, and compound query object as predicate.

[![Build Status](http://img.shields.io/travis/wilmoore/array.filter.js.svg)](https://travis-ci.org/wilmoore/array.filter.js) [![Code Climate](https://codeclimate.com/github/wilmoore/array.filter.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/array.filter.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install array.filter --save
```

> You can also use Duo, Bower or [download the files manually](https://github.com/wilmoore/array.filter.js/releases).

###### npm stats

[![npm](https://img.shields.io/npm/v/array.filter.svg)](https://www.npmjs.org/package/array.filter) [![NPM downloads](http://img.shields.io/npm/dm/array.filter.svg)](https://www.npmjs.org/package/array.filter) [![David](https://img.shields.io/david/wilmoore/array.filter.js.svg)](https://david-dm.org/wilmoore/array.filter.js)

## Overview

Similar to `[].filter` but more functional and compositionally friendly.

## Features

- Supports all dot/bracket-notation string paths supported by [selectn].
- Partial application is directly supported via currying (no need for `Function.prototype.bind`).
- ES3, ES5, CommonJS, AMD, and legacy-global compatible.
- Haskell style [Parameter Order] (allows for [pointfree programming style]).

## API Example

###### Unary function predicate

```js
var filter = require('array.filter')
var numbers = [1, 2, 3, 4, 5]
var even = function (x) { return x % 2 === 0 }

filter(even, numbers)
//=> [ 2, 4 ]
```

###### RegExp predicate

```js
var filter = require('array.filter')
var hexval = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
var number = /^\d$/

filter(number, hexval)
//=> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9  ]
```

###### Dot-notation path string predicate

```js
var filter = require('array.filter')
var messages = [
  { read: true },
  { read: true },
  { read: false }
]

filter('read', messages).length
//=> 2
```

###### Compound query predicate

```js
var filter = require('array.filter')
var messages = [
  { type: 'sent', meta: { read: true } },
  { type: 'received', meta: { read: true } },
  { type: 'sent', meta: { read: false } }
]

filter({ type: 'sent', 'meta.read': false }, messages).length
//=> 1
```

## API

### `filter(predicate, list)`

###### arguments

 - `predicate (Function|RegExp|String|Object)` Unary function, RegExp, dot/bracket-notation string path, or compound query object.
 - `list (array)` Array to evaluate.

###### returns

 - `(array)` New array containing items from given array for which predicate returns true.

## Alternatives

 - [_.filter]
 - [array-filter]
 - [arr-filter]
 - [arrayfilter]
 - [curried-filter]
 - [filter-array]

## Contributing

> SEE: [contributing.md](contributing.md)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/array.filter.js.svg)](https://github.com/wilmoore/array.filter.js/blob/master/license)

[_.filter]: https://lodash.com/docs#filter
[array-filter]: https://www.npmjs.com/package/array-filter
[arr-filter]: https://www.npmjs.com/package/arr-filter
[arrayfilter]: https://www.npmjs.com/package/arrayfilter
[curried-filter]: https://www.npmjs.com/package/curried-filter
[filter-array]: https://www.npmjs.com/package/filter-array
[Parameter Order]: https://wiki.haskell.org/Parameter_order
[pointfree programming style]: https://medium.com/@wilmoore/un-bind-your-js-with-curry-a8657a4138cb#.v81fxc79y
[selectn]: https://www.npmjs.com/package/selectn
