//File : src/core/coreMethods/x.core.serialize.js

(function(x){
	'use strict';
	x.core.serialize = function(data){
		var result = '';
		for(var field in data){
			result +=field+'='+data[field];
		}
		data = encodeURI(data);
	};
})(this.x);
