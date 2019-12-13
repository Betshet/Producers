


$(document).ready( function () {
	var dataSet = [];
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/getClients',

		success: function (res) {
			console.log(res.clients);
			res.clients.forEach((clients)=>{})
		},
		error: function (request, status, error) {
			alert(error);
		}	

			
	});
	
	console.log(dataSet);
	
	$('#tableClients').DataTable({
		colReorder: true,
		rowReorder: true,
		select: true,
		data: dataSet,
		columns: [
			{title:"lorem"},
			{title:"ipsum"},
			{title:"dolor"},
			{title:"sit"},
			{title:"amet"}
		]	
	});	
});

