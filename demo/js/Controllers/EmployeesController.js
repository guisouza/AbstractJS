x.Controller('EmployeesController',function(MessagesService,xHttp){

	var i=0
	while(i<10000){
		this['x'+i] = i+'z'
		i++
	}

	// xHttp.get('http://localhost:5554/demo/data.json',function(x){
	// 	this['x1'] = 'zz';
	// 	// console.log(x)
	// })

	// this.zas = [
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// {nome:'a'},
	// ];

	this.alert = function(){
		this['x1'] = 'zz';
	}

});
