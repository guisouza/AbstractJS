//File : src/controller.js

(function(x){
  'use strict';
/**
 * [Model description]
 * @param {[type]} controller
 * @param {[type]} htmlElement
 */
 x.Model = function(controller,htmlElement){
  var self = this;
  var data = {};
  var modelName = htmlElement.getAttribute('x-model');

  var htmlElements = [htmlElement];


  /**
    * [getInputs description]
    * @return {[type]}
    */
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



  /**
   * [inputChange description]
   * @param  {[type]} e
   * @return {[type]}
   */
   var inputChange = function(e){
    var el = e.target;
    var name = el.getAttribute('name');
    var value = el.value;
    data[name] =  value;
    broadcast(data);
  };


  /**
   * [absorveData description]
   * @param  {[type]} data
   * @param  {[type]} newData
   * @return {[type]}
   */
   var absorveData = function(data,newData){
    for(var field in newData){
      data[field] = newData[field];
    }
    return data;
  };


  /**
   * [broadcast description]
   * @param  {[type]} data
   * @return {[type]}
   */
   var broadcast = function(data){
    for(var propertie in data){
      applyValues(propertie,data[propertie]);
    }
  };


  /**
   * [applyValues description]
   * @param  {[type]} propertie
   * @param  {[type]} value
   * @return {[type]}
   */
   var applyValues = function(propertie,value){
    htmlElements.forEach(function(element){
      element.querySelectorAll('[name="'+propertie+'"]').forEach(function(a,b){
        a.value = value;
      });
    });
  };


  /**
   * [structByDom description]
   * @return {[type]}
   */
   var structByDom = function(){
    absorveData(getInputs(),data);
    return Model;
  };


  structByDom();

  var Model = this;
  return {

    /**
     * [appendDom description]
     * @param  {[type]} element
     * @return {[type]}
     */
     appendDom : function(element){
      htmlElements.push(element);
    },

    /**
     * [getModelName description]
     * @return {[type]}
     */
     getModelName : function(){
      return modelName;
    },

    /**
     * [getData description]
     * @return {[type]}
     */
     getData : function(){
      var result = {};
      result[modelName] = data;
      return result;
    },

    /**
     * [edit description]
     * @param  {[type]} record
     * @return {[type]}
     */
     edit : function(record){
      broadcast(record);
      return record;
    }
  };
};

})(this.x);