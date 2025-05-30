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

var array = require( '@stdlib/ndarray-array' );
var zeroTo = require( '@stdlib/array-base-zero-to' );
var ndarray2array = require( '@stdlib/ndarray-to-array' );
var nditerStacks = require( './../lib' );

// Define an input array:
var x = array( zeroTo( 27 ), {
	'shape': [ 3, 3, 3 ]
});

// Create an iterator for iterating over matrices:
var it = nditerStacks( x, [ 1, 2 ] );

// Perform manual iteration...
var v;
while ( true ) {
	v = it.next();
	if ( v.done ) {
		break;
	}
	console.log( ndarray2array( v.value ) );
}

// Create an iterator for iterating over matrices:
it = nditerStacks( x, [ 0, 2 ] );

// Perform manual iteration...
while ( true ) {
	v = it.next();
	if ( v.done ) {
		break;
	}
	console.log( ndarray2array( v.value ) );
}

// Create an iterator for iterating over matrices:
it = nditerStacks( x, [ 0, 1 ] );

// Perform manual iteration...
while ( true ) {
	v = it.next();
	if ( v.done ) {
		break;
	}
	console.log( ndarray2array( v.value ) );
}
