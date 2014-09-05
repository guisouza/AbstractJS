//File : src/core/coreMethods/x.core.checkDependencies.js

(function(x){

  'use strict';
  x.core.checkDependencies = function(data){
  	var rDependencies = [];
  	for(var dependencie in data){
  		if (dependencie < data.length-1){

  			if (x.services[data[dependencie]]){

  				rDependencies[dependencie] = x.services[data[dependencie]];
  			}else{
  				throw('Dependencie Not Fount =[');
  			}
  		}
  	}

  	return rDependencies;

  };
})(this.x);
