



//File : src/core/coreMethods/x.core.parse.js

(function(x){

  'use strict';
  /**
   * [parse description]
   * @return {[type]}
   */
  x.core.parse = function(){

    if(typeof arguments[0] == 'string'){
      return applyParserGroup(arguments[0],arguments[1],arguments[2]);
    }else{
      var controllerElements = document.querySelectorAll('[x-controller]');
      for(var element in controllerElements){
        var index = element;
        element = controllerElements[element];
        if (element.tagName !== undefined){
          var controller = x.core.parsers['x-controller'](element);
          for(var parser in x.core.parsers){
            if (typeof x.core.parsers[parser] == 'function'){
              applyParser(parser,x.core.parsers[parser],element,controller);
            }else{
              applyParserGroup(parser,element,controller);
            }
          }
        }
      }
    }


    /**
     * [applyParserGroup description]
     * @param  {[type]} parserGroup
     * @param  {[type]} element
     * @param  {[type]} controller
     * @return {[type]}
     */
    function applyParserGroup(parserGroup,element,controller){
      for (var parser in x.core.parsers[parserGroup]){
        applyParser(parser,x.core.parsers[parserGroup][parser],element,controller);
      }
    }



    /**
     * [applyParser description]
     * @param  {[type]} selector
     * @param  {[type]} parser
     * @param  {[type]} element
     * @param  {[type]} controller
     * @return {[type]}
     */
    function applyParser(selector,parser,element,controller){
      if (parser != 'x-controller'){
        var ELs = element.querySelectorAll('['+selector+']');
        ELs.forEach(function(element){
          parser(element,controller);
        });
      }
    }
  };

})(this.x);
