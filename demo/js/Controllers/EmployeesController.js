x.Controller('EmployeesController',[function(){

	this.edit = function(param){
		record = this.allEmployees[param]
		this.employee.edit(record);
	}

	this.alert = function(message){
		alert(message);
	}

}]);
