//File : src/controller.js

(function(x){
  'use strict';

  x.Model = function(controller,htmlElement){
    var self = this;
    var data = {};
    var modelName = htmlElement.getAttribute('x-model');

    var htmlElements = [htmlElement];

    var getInputs = function(){
      var elements = htmlElement.getElementsByTagName('input');
      var temp = {};
      for(var element in elements){
        if (typeof elements[element]  == 'object'){
          var field = elements[element].getAttribute('name');
          temp[field] = elements[element].value;
          elements[element].addEventListener('keypress',inputChange);
          elements[element].addEventListener('change',inputChange);
        }
      }
      return absorveData(data,temp);
    };

    var inputChange = function(e){
      var el = e.target;
      var name = el.getAttribute('name');
      var value = el.value;
      data[name] =  value;
      broadcast(data);
    };

    var absorveData = function(data,newData){
      for(var field in newData){
        data[field] = newData[field];
      }
      return data;
    };

    var broadcast = function(data){
      for(var propertie in data){
        applyValues(propertie,data[propertie]);
      }
    };

    var applyValues = function(propertie,value){
      htmlElements.forEach(function(element){
        element.querySelectorAll('[name="'+propertie+'"]').forEach(function(a,b){
          a.value = value;
        });
      });

    };

    var structByDom = function(){
      absorveData(getInputs(),data);
      return Model;
    };


    structByDom();

    var Model = this;
    return {
      appendDom : function(element){
        htmlElements.push(element);
      },
      getModelName : function(){
        return modelName;
      },
      getData : function(){
        var result = {};
        result[modelName] = data;
        return result;
      },
      edit : function(record){
        broadcast(record);
        return record;
      }
    };
  };

})(this.x);