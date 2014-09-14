//File : src/core/coreMethods/x.core.addParser.js
/**
 * Add a new DOM parser
 * @param      {String}   parserName
 * @param      {Function}   modifier function
 */
(function(x){
	'use strict';

	x.core.addParser = function(parserName,parser){
		if (parserName.indexOf('.') != -1){
			parserName = parserName.split('.');
			if (!x.core.parsers[parserName[0]]){
				x.core.parsers[parserName[0]] = {};
			}
			x.core.parsers[parserName[0]][parserName[1]] = parser;
		}else{
			x.core.parsers[parserName] = parser;
		}
		
	};

})(this.x);
