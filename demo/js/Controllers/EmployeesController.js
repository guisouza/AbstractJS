x.Controller('FuncionariosController',[function(){

	this.editar = function(param){
		record = this.allFuncionarios[param]
		this.funcionario.edit(record);
	}

}]);
