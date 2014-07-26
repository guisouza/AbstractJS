//File : src/core/parsers/x-events.js

(function(x){
  'use strict';

  x.core.addParser('events.x-click',function(element,controller){

    var action = element.getAttribute('x-click');
    var params = action.match(/\(.*\)/g)[0].replace('(','').replace(')','').split(',');
    for(var param in params){

      if (params[param].indexOf('function') != -1){
      }else{
        if (params[param][0] != "'" && params[param][0] != '"' && params[param][0] != '['){
          params[param] = parseInt(params[param]);
        }else if (params[param][0] == "'" || params[param][0] == '"'){

          params[param] = params[param].replace('"','').replace("'",'').replace('"','').replace("'",'').replace('"','').replace("'",'');
        }
      }
    }

    action = action.match(/.*\(/g)[0].replace('(','');
      element.addEventListener('click',function(){
        console.log(controller);
        controller[action].apply(controller,params);
      });

    });

  x.core.addParser('events.x-mouseover',function(element,controller){

    var action = element.getAttribute('x-mouseover');
    var params = action.match(/\(.*\)/g)[0].replace('(','').replace(')','').split(',');
    for(var param in params){

      if (params[param].indexOf('function') != -1){
      }else{
        if (params[param][0] != "'" && params[param][0] != '"' && params[param][0] != '['){
          params[param] = parseInt(params[param]);
        }else if (params[param][0] == "'" || params[param][0] == '"'){

          params[param] = params[param].replace('"','').replace("'",'').replace('"','').replace("'",'').replace('"','').replace("'",'');
        }
      }
    }

    action = action.match(/.*\(/g)[0].replace('(','');
      element.addEventListener('mouseover',function(){
        console.log(controller);
        controller[action].apply(controller,params);
      });

  });


})(this.x);