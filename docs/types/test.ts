/*
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

import zeros = require( '@stdlib/ndarray-zeros' );
import nditerStacks = require( './index' );


// TESTS //

// The function returns an iterator...
{
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ] ); // $ExpectType Iterator<typedndarray<number>>
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], {} ); // $ExpectType Iterator<typedndarray<number>>
}

// The compiler throws an error if the function is provided a first argument which is not an ndarray...
{
	nditerStacks( 123, [ 1, 2 ] );  // $ExpectError
	nditerStacks( true, [ 1, 2 ] ); // $ExpectError
	nditerStacks( false, [ 1, 2 ] ); // $ExpectError
	nditerStacks( null, [ 1, 2 ] ); // $ExpectError
	nditerStacks( undefined, [ 1, 2 ] ); // $ExpectError
	nditerStacks( {}, [ 1, 2 ] ); // $ExpectError
	nditerStacks( [], [ 1, 2 ] ); // $ExpectError
	nditerStacks( ( x: number ): number => x, [ 1, 2 ] ); // $ExpectError

	nditerStacks( 123, [ 1, 2 ], {} );  // $ExpectError
	nditerStacks( true, [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( false, [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( null, [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( undefined, [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( {}, [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( [], [ 1, 2 ], {} ); // $ExpectError
	nditerStacks( ( x: number ): number => x, [ 1, 2 ], {} ); // $ExpectError
}

// The compiler throws an error if the function is provided a second argument which is not an array of numbers...
{
	nditerStacks( zeros( [ 2, 2, 2 ] ), '123' );  // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), 5 );  // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), true ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), false ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), null ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), undefined ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ '5' ] ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), ( x: number ): number => x ); // $ExpectError

	nditerStacks( zeros( [ 2, 2, 2 ] ), '123', {} );  // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), 5, {} );  // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), true, {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), false, {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), null, {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), undefined, {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), {}, {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ '5' ], {} ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), ( x: number ): number => x, {} ); // $ExpectError
}

// The compiler throws an error if the function is provided a third argument which is not an object...
{
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], 'abc' ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], 123 ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], true ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], false ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], null ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], [] ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], ( x: number ): number => x ); // $ExpectError
}

// The compiler throws an error if the function is provided a `readonly` option which is not a boolean...
{
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': 'abc' } ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': 123 } ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': null } ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': [] } ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': {} } ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], { 'readonly': ( x: number ): number => x } ); // $ExpectError
}

// The compiler throws an error if the function is provided an unsupported number of arguments...
{
	nditerStacks(); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ) ); // $ExpectError
	nditerStacks( zeros( [ 2, 2, 2 ] ), [ 1, 2 ], {}, {} ); // $ExpectError
}
