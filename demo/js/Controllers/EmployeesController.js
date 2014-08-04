x.Controller('EmployeesController',['MessagesService',function(MessagesService){

	this.edit = function(param){
		record = this.allEmployees[param]
		this.employee.edit(record);
	}

	this.alert = function(message){
		MessagesService.alertar(message)
	}

}]);
