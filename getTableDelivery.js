


$(document).ready( function () {
	var user = getCookie('name');
	console.log(user);
	if(user.localeCompare('admin')==0){
		var urlString = 'http://localhost:3000/getTable?p1=delivery';
	}
	else{ var urlString = 'http://localhost:3000/getRows?p1=delivery&p2=idProducer&p3='+user; }
	
	
	$.ajax({
		type: 'GET',
		url: urlString,

		success: function (res) {
			var dataSet = []
			var delivery = JSON.parse(res.rows);
			for(i in delivery){
				dataSet.push(Object.values(delivery[i]));
			}
			console.log(dataSet);
			

			$('#tableDelivery').DataTable({
				colReorder: true,
				rowReorder: true,
				select: true,
				data: dataSet,
				columns: [
					{title:"ID"},
					{title:"quantity"},
					{title:"productsType"},
					{title:"deliveryHour"},
					{title:"Producer"},
					{title:"Consumer"}
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
	var table = $('#tableDelivery').DataTable();	

	var idDelivery = table
	.rows( '.selected' )
	.data()[0][0];
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/deleteRow?p1=delivery&p2=idDelivery&p3='+idDelivery,
		
		success: function () { },
		error: function (request, status, error) {
			alert(error);
		}		
	});
	
}