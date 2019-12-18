function login() {
	
	var param = document.getElementById("uniqueID").value; 
	
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/getRows?p1=producer&p2=email&p3='+param,
		
		success: function (res) {
			
			if(param=="admin"){
				document.cookie = "name="+param;
				window.location.href = "Homepage.html";
			}
			else{
				var logged = JSON.parse(res.rows);
				if(logged.length==0){
					alert("Unknown account");
				}
				else{
					document.cookie = "name="+(logged[0]).idProducer;

					window.location.href = "HomepageUser.html";
				}
			}
			
		},
		error: function (request, status, error) {
			alert(error);
		}		
	});
}


function getCookie(cname) {
  var name = cname + "=";

  var coockiesplit = (document.cookie).split(';');
  
  for(var i = 0; i <coockiesplit.length; i++) {
    var c = coockiesplit[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function returnHome(){
	var name = getCookie("name");
	if (name=="admin") window.location.href = "Homepage.html";
	else window.location.href = "HomepageUser.html";
}