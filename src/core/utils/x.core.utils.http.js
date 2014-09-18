 x.Util('xHttp',[function(){

	var defaultMessage = 5;

	return{
		get : function(url,callback){
			var args = {};
			args.method = 'GET';
			args.url = url;
			args.callback = function(retorno){
				callback(retorno);
			};
			x.core.ajax(args);
		}		
	};
}]);
