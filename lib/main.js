/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var isPlainObject = require( '@stdlib/assert-is-plain-object' );
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isIntegerArray = require( '@stdlib/assert-is-integer-array' ).primitives;
var isndarrayLike = require( '@stdlib/assert-is-ndarray-like' );
var isReadOnly = require( '@stdlib/ndarray-base-assert-is-read-only' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var iteratorSymbol = require( '@stdlib/symbol-iterator' );
var zeros = require( '@stdlib/array-base-zeros' );
var copy = require( '@stdlib/array-base-copy' );
var take = require( '@stdlib/array-base-take' );
var put = require( '@stdlib/array-base-put' );
var getShape = require( '@stdlib/ndarray-shape' );
var normalizeIndex = require( '@stdlib/ndarray-base-normalize-index' );
var numel = require( '@stdlib/ndarray-base-numel' );
var slice = require( '@stdlib/ndarray-base-slice' );
var nextCartesianIndex = require( '@stdlib/ndarray-base-next-cartesian-index' ).assign;
var args2multislice = require( '@stdlib/slice-base-args2multislice' );
var format = require( '@stdlib/string-format' );


// MAIN //

/**
* Returns an iterator which iterates over each subarray in a stack of subarrays according to a list of specified stack dimensions.
*
* @param {ndarray} x - input value
* @param {IntegerArray} dims - indices of dimensions to stack
* @param {Options} [options] - function options
* @param {boolean} [options.readonly=true] - boolean indicating whether returned views should be read-only
* @throws {TypeError} first argument must be an ndarray
* @throws {TypeError} first argument must have at least `dims.length+1` dimensions
* @throws {TypeError} second argument must be an array of integers
* @throws {RangeError} dimension index exceeds the number of dimensions
* @throws {Error} dimension indices must be sorted in ascending order
* @throws {Error} dimension indices must be unique
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {Error} cannot write to a read-only array
* @returns {Iterator} iterator
*
* @example
* var array = require( '@stdlib/ndarray-array' );
* var ndarray2array = require( '@stdlib/ndarray-to-array' );
*
* var x = array( [ [ [ 1, 2 ], [ 3, 4 ] ], [ [ 5, 6 ], [ 7, 8 ] ] ] );
* // returns <ndarray>
*
* var iter = nditerStacks( x, [ 1, 2 ] );
*
* var v = iter.next().value;
* // returns <ndarray>
*
* var arr = ndarray2array( v );
* // returns [ [ 1, 2 ], [ 3, 4 ] ]
*
* v = iter.next().value;
* // returns <ndarray>
*
* arr = ndarray2array( v );
* // returns [ [ 5, 6 ], [ 7, 8 ] ]
*
* // ...
*/
function nditerStacks( x, dims ) {
	var indices;
	var options;
	var shape;
	var ndims;
	var odims;
	var opts;
	var iter;
	var ibuf;
	var FLG;
	var idx;
	var sh;
	var M;
	var N;
	var d;
	var i;
	var j;

	if ( !isndarrayLike( x ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an ndarray. Value: `%s`.', x ) );
	}
	if ( !isIntegerArray( dims ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be an array of integers. Value: `%s`.', dims ) );
	}
	opts = {
		'writable': false
	};
	if ( arguments.length > 2 ) {
		options = arguments[ 2 ];
		if ( !isPlainObject( options ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
		}
		if ( hasOwnProp( options, 'readonly' ) ) {
			if ( !isBoolean( options.readonly ) ) {
				throw new TypeError( format( 'invalid option. `%s` option must be a boolean. Option: `%s`.', 'readonly', options.readonly ) );
			}
			opts.writable = !options.readonly;
			if ( opts.writable && isReadOnly( x ) ) {
				throw new Error( format( 'invalid option. Cannot write to read-only array.' ) );
			}
		}
	}
	odims = dims; // cache a reference to the original input array
	dims = copy( dims );
	M = dims.length;

	// Retrieve input array meta data:
	shape = getShape( x );
	ndims = shape.length;

	// Ensure that the input array has sufficient dimensions...
	if ( ndims <= M ) {
		throw new TypeError( format( 'invalid argument. First argument must be an ndarray having at least %d dimensions.', M+1 ) );
	}
	// Normalize dimension indices...
	for ( i = 0; i < M; i++ ) {
		d = normalizeIndex( dims[ i ], ndims-1 );
		if ( d === -1 ) {
			throw new RangeError( format( 'invalid argument. Dimension index exceeds the number of dimensions. Number of dimensions: %d. Value: `%d`.', ndims, dims[ i ] ) );
		}
		dims[ i ] = d;
	}
	// Check whether the input array is empty:
	N = numel( shape );
	if ( N === 0 ) {
		FLG = true;
	}
	// Ensure the indices are sorted in ascending order:
	for ( i = 0; i < M-1; i++ ) {
		if ( dims[ i ] > dims[ i+1 ] ) {
			throw new Error( format( 'invalid argument. Dimension indices must be sorted in ascending order. Value: `%s`.', odims ) );
		}
	}
	// Ensure that indices are unique...
	j = 1;
	for ( i = 1; i < M; i++ ) {
		if ( dims[ i ] === dims[ i-1 ] ) {
			throw new Error( format( 'invalid argument. Dimension indices must be unique. Value: `%s`.', odims ) );
		}
		dims[ j ] = dims[ i ];
		j += 1;
	}
	// Compute the number of subarrays across all stacks of subarrays:
	for ( i = 0; i < M; i++ ) {
		N /= shape[ dims[ i ] ];
	}
	// Initialize an index array for generating slices:
	idx = zeros( ndims );

	// Set the specified dimensions to `null` to indicate that we want a full "slice" for those dimensions:
	for ( i = 0; i < M; i++ ) {
		idx[ dims[ i ] ] = null;
	}
	// Create an array of indices over which we want to iterate:
	indices = [];
	j = 0;
	for ( i = 0; i < ndims; i++ ) {
		if ( i === dims[ j ] ) {
			j += 1;
			continue;
		}
		indices.push( i );
	}
	// Create an index buffer for generating Cartesian indices:
	sh = take( shape, indices, 'throw' );
	ibuf = take( idx, indices, 'throw' );

	// Initialize a counter:
	i = -1;

	// Create an iterator protocol-compliant object:
	iter = {};
	setReadOnly( iter, 'next', next );
	setReadOnly( iter, 'return', end );

	// If an environment supports `Symbol.iterator`, make the iterator iterable:
	if ( iteratorSymbol ) {
		setReadOnly( iter, iteratorSymbol, factory );
	}
	return iter;

	/**
	* Returns an iterator protocol-compliant object containing the next iterated value.
	*
	* @private
	* @returns {Object} iterator protocol-compliant object
	*/
	function next() {
		var s;

		i += 1;
		if ( FLG || i >= N ) {
			return {
				'done': true
			};
		}
		// Create a multi-slice for the current view:
		s = args2multislice( idx );

		// Update the index buffer:
		ibuf = nextCartesianIndex( sh, 'row-major', ibuf, -1, ibuf );

		// Update the index array:
		idx = put( idx, indices, ibuf, 'throw' );

		// Return the next slice:
		return {
			'value': slice( x, s, true, opts.writable ),
			'done': false
		};
	}

	/**
	* Finishes an iterator.
	*
	* @private
	* @param {*} [value] - value to return
	* @returns {Object} iterator protocol-compliant object
	*/
	function end( value ) {
		FLG = true;
		if ( arguments.length ) {
			return {
				'value': value,
				'done': true
			};
		}
		return {
			'done': true
		};
	}

	/**
	* Returns a new iterator.
	*
	* @private
	* @returns {Iterator} iterator
	*/
	function factory() {
		return nditerStacks( x, dims, opts );
	}
}


// EXPORTS //

module.exports = nditerStacks;
