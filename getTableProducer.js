


$(document).ready( function () {
	
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/getTable?p1=producer',

		success: function (res) {
			var dataSet = []
			var producers = JSON.parse(res.rows);
			for (i in producers){
				dataSet.push(Object.values(producers[i]));
			}
			
			console.log(dataSet);
			

			$('#tableProducers').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"Name"},
					{title:"Surname"},
					{title:"Email"},
					{title:"Phone"}
				]	
			});	
			
		},
		error: function (request, status, error) {
			alert(error);
		}		
	});

});

function delRow(){
	window.location.reload();
	var table = $('#tableProducers').DataTable();	

	var idProd = table
	.rows( '.selected' )
	.data()[0][0];
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/deleteRow?p1=producer&p2=idProducer&p3='+idProd,
		
		success: function () { },
		error: function (request, status, error) {
			alert(error);
		}		
	});
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/deleteRow?p1=address&p2=idProducer&p3='+idProd,
		
		success: function () { },
		error: function (request, status, error) {
			alert(error);
		}		
	});
	
}

function editRow(){
	var table = $('#tableProducers').DataTable();	

	var idProducer = table
	.rows( '.selected' )
	.data()[0][0];
	
	document.cookie = "producer="+idProducer;
	
	window.location.href='EditProducerForm.html'; 
}