"use strict";var k=function(n,e){return function(){try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}}};var x=k(function(U,V){"use strict";var q=require("@stdlib/utils-define-nonenumerable-read-only-property"),D=require("@stdlib/assert-is-plain-object"),F=require("@stdlib/assert-is-boolean").isPrimitive,I=require("@stdlib/assert-is-integer-array").primitives,P=require("@stdlib/assert-is-ndarray-like"),R=require("@stdlib/ndarray-base-assert-is-read-only"),z=require("@stdlib/assert-has-own-property"),b=require("@stdlib/symbol-iterator"),C=require("@stdlib/array-base-zeros"),L=require("@stdlib/array-base-copy"),E=require("@stdlib/array-base-take"),N=require("@stdlib/array-base-put"),A=require("@stdlib/ndarray-shape"),B=require("@stdlib/ndarray-base-normalize-index"),G=require("@stdlib/ndarray-base-numel"),M=require("@stdlib/ndarray-base-slice"),H=require("@stdlib/ndarray-base-next-cartesian-index").assign,J=require("@stdlib/slice-base-args2multislice"),i=require("@stdlib/string-format");function O(n,e){var t,o,l,u,m,f,d,w,y,s,c,a,g,p,r,v;if(!P(n))throw new TypeError(i("invalid argument. First argument must be an ndarray. Value: `%s`.",n));if(!I(e))throw new TypeError(i("invalid argument. Second argument must be an array of integers. Value: `%s`.",e));if(f={writable:!1},arguments.length>2){if(o=arguments[2],!D(o))throw new TypeError(i("invalid argument. Options argument must be an object. Value: `%s`.",o));if(z(o,"readonly")){if(!F(o.readonly))throw new TypeError(i("invalid option. `%s` option must be a boolean. Option: `%s`.","readonly",o.readonly));if(f.writable=!o.readonly,f.writable&&R(n))throw new Error("invalid option. Cannot write to read-only array.")}}if(m=e,e=L(e),a=e.length,l=A(n),u=l.length,u<=a)throw new TypeError(i("invalid argument. First argument must be an ndarray having at least %d dimensions.",a+1));for(r=0;r<a;r++){if(p=B(e[r],u-1),p===-1)throw new RangeError(i("invalid argument. Dimension index exceeds the number of dimensions. Number of dimensions: %d. Value: `%d`.",u,e[r]));e[r]=p}for(g=G(l),g===0&&(y=!0),r=0;r<a-1;r++)if(e[r]>e[r+1])throw new Error(i("invalid argument. Dimension indices must be sorted in ascending order. Value: `%s`.",m));for(v=1,r=1;r<a;r++){if(e[r]===e[r-1])throw new Error(i("invalid argument. Dimension indices must be unique. Value: `%s`.",m));e[v]=e[r],v+=1}for(r=0;r<a;r++)g/=l[e[r]];for(s=C(u),r=0;r<a;r++)s[e[r]]=null;for(t=[],v=0,r=0;r<u;r++){if(r===e[v]){v+=1;continue}t.push(r)}return c=E(l,t,"throw"),w=E(s,t,"throw"),r=-1,d={},q(d,"next",T),q(d,"return",j),b&&q(d,b,S),d;function T(){var h;return r+=1,y||r>=g?{done:!0}:(h=J(s),w=H(c,"row-major",w,-1,w),s=N(s,t,w,"throw"),{value:M(n,h,!0,f.writable),done:!1})}function j(h){return y=!0,arguments.length?{value:h,done:!0}:{done:!0}}function S(){return O(n,e,f)}}V.exports=O});var K=x();module.exports=K;
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
//# sourceMappingURL=index.js.map
