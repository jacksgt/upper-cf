function viewTOS() { // show terms of service
    document.getElementById("overlay").style.display = "block";
}

function getId(id) { return document.getElementById(id); }

function upload() {
    var file = getId("fileform").file.files[0];
    if(file != undefined && file.fileSize > 10485760) {
     	alert("Your file is too big! (Max. 10MB)");
     	return 1;
    }
    var formData = new FormData(getId("fileform"));

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
	if(request.readyState == 4 && request.status == 200) {
	    updatePage(request.response);
	}
    };

    //request.upload.addEventListener("progress", uploadBar, false);
    //request.addEventListener("load", uploadFinished, false);
    //request.addEventListener("error", uploadError, false);
    
    request.open("POST", "upload.php", true);
    request.send(formData);
}
window.onload = function () {
    document.getElementById("fileform").onsubmit = function(event) {
	event.preventDefault();
	getId("mainform").style.transition = "opacity 0.25s ease-in-out";
	getId("mainform").style.height = "0";
	getId("mainform").style.opacity = "0";

	getId("uploading").style.transition = "opacity 0.25s ease-in-out";
	getId("uploading").style.height = "130px";
	getId("uploading").style.opacity = "1";

	getId("mainform").style.transition = "display 0.5s";
	getId("mainform").style.display = "none";

	upload();
    }

    
}

function updatePage(response) {
    getId("mainform").style.display = "none";
    
    getId("uploading").style.transition = "opacity 0.25s ease-in-out";
    getId("uploading").style.height = "0";
    getId("uploading").style.opacity = "0";

    getId("finished").style.transition = "opacity 0.25s ease-in-out";
    getId("finished").style.height = "130px";
    getId("finished").style.opacity = "1";

    if( (response.search("Error") == -1) && (response.search("ERROR") == -1) ) {
	getId("finished").innerHTML = "Your file has been saved to " + response;
    } else {
	getId("finished").innerHTML = "Sorry, somthing went wrong :-(";
    }
}
