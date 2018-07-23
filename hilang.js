/*
	JavaScript hilang v0.1
	Copyright (c) 2018 Arseny Mikhalev
	GitHub: ''
	License: http://www.opensource.org/licenses/mit-license.php

	Hilang - Hiccup-like (Clojure) Domain Specific Language for JavaScript.
  * Hiccup - https://github.com/weavejester/hiccup/wiki/Syntax
	
  No dependencies, es5.
	Primary use: VueJS template
*/

var hilang = (function() {

	'use strict';

	function _hilang(_dsl) {
		/**
		 * This function takes dsl and converts it to a single line html.
		 *
		 * Expects data (dsl) in the following form:
		 *
		 * ['div', {attrs: 'class="main-content"'},
		 * 	['p', 'Example: This is a <strong>sentence</strong> of text and it also has some <em>italicized text</em> too.'],
		 * 	['p', 'This is <a href="/index.html">another paragraph</a>.']];
		 */

		// [0] Check for null exception
		if (_dsl.length === 0) { return; }

		// Otherwise proceed with logic

		var tag = _dsl[0];

		// [1] Check for undefined/null
		var posOne =
			_dsl[1] ?
				_dsl[1]
				: []
		;

		var posOneIsArr = Array.isArray(posOne);

		var children = '';
		var attributes = '';

		// Type 1 dsl -> ['div', 'some strings']
		if (typeof posOne === 'string' || posOne instanceof String) {
			children = posOne;
		}

		// Type 2 dsl -> ['div', ['div', 'some strings']]
		else if (posOneIsArr) {
			var recur2 = _dsl.slice(1);
			children =
				recur2
					.map(function(rec) {
						return _hilang(rec);
					})
					.join('')
			;
		}

		// Type 3 dsl -> ['div', {class: 'has-attributes'}]
		else {
			attributes = ' ' + _dsl[1].attrs;

			var recur3 = _dsl.slice(2);
			var strChildren =
				recur3.length !== 0 ?
					recur3[0]:
					''
			;

			if ( typeof strChildren === 'string' || strChildren instanceof String ) {
				children = strChildren;
			}
			else {

				children =
					recur3
						.map(function(rec) {
							return _hilang(rec);
						})
						.join('')
				;
			}
		}
		var _html = '<' + tag + attributes + '>' + children + '</' + tag + '>';

		return _html;
	}
	return _hilang;
})();

(function() {

	'use strict';

	if (typeof define === 'function' && define.amd) { define('hilang', function() { return hilang; }); }
	else if (typeof module !== 'undefined' && module.exports) { module.exports = hilang; }
	else { window.hilang = hilang; }
})();
