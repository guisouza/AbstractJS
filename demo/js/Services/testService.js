x.Service('testService',[function(){

	var defaultMessage = 5;

	return{
		alertar : function(param){
			if (param){
				alert(param);
			}else{
				alert(defaultMessage);
			}

		}		
	}
}]);
