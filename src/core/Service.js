//File : src/controller.js

(function(x){
  'use strict';

  x.Service = function(){

		x.services[arguments[0]] = new arguments[1][arguments[1].length-1]();
  };

})(this.x);