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