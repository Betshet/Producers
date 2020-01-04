


$(document).ready( function () {
	var user = getCookie('name');
	console.log(user);
	if(user.localeCompare('admin')==0){
		var urlString = 'http://localhost:3000/getTable?p1=consumer';
	}
	else{ var urlString = 'http://localhost:3000/getRows?p1=consumer&p2=idProducer&p3='+user; }
	
	
	$.ajax({
		type: 'GET',
		url: urlString,

		success: function (res) {
			var dataSet = []
			var clients = JSON.parse(res.rows);
			for(i in clients){
				dataSet.push(Object.values(clients[i]));
			}
			console.log(dataSet);
			

			$('#tableClients').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"Name"},
					{title:"Surname"},
					{title:"Email"},
					{title:"Phone"},
					{title:"Producer"}
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
	var table = $('#tableClients').DataTable();	

	var idClient = table
	.rows( '.selected' )
	.data()[0][0];
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/deleteRow?p1=consumer&p2=idConsumer&p3='+idClient,
		
		success: function () {},
		error: function (request, status, error) {
			alert(error);
		}		
	});
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/deleteRow?p1=consumeraddress&p2=idConsumer&p3='+idClient,
		
		success: function () {},
		error: function (request, status, error) {
			alert(error);
		}		
	});
}
