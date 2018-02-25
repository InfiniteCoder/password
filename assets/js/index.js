function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function check(){
    var xmlHttp = new XMLHttpRequest();
    var password= document.getElementById("password").value;
    var url = "https://api.pwnedpasswords.com/pwnedpassword/" + password;
    console.log(url);
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );
    xmlHttp.onload = function(){
        var count = xmlHttp.responseText;
        if(count === ''){
            count = 0;
        }
        var countp = document.getElementById("count");
        countp.innerHTML = count;

        if(count !== 0){
            countp.style.color = 'red';
        }
        else{
            countp.style.color = 'green';
        }
    }
}

onload = function(){
    var passwordButton = document.getElementById("password");
    passwordButton.oninput = debounce(check,350);
}