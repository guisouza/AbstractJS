//File : src/controller.js

(function(x){
  'use strict';
  /**
   * [Service description]
   */
  x.Service = function(){
  		/**
  		 * Creating the service
  		 */
		x.services[arguments[0]] = new arguments[1][arguments[1].length-1]();
  };

})(this.x);