//File : src/core/coreMethods/x.core.parse.js

(function(x){

  'use strict';
  
  x.core.parse = function(){

    if(typeof arguments[0] == 'string'){
      applyParserGroup(arguments[0],arguments[1],arguments[2]);
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

    function applyParserGroup(parserGroup,element,controller){
      for (var parser in x.core.parsers[parserGroup]){
        applyParser(parser,x.core.parsers[parserGroup][parser],element,controller);
      }
    }

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
