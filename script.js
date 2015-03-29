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
	getId("mainform").style.transition = "all 0.25s ease-in-out";
	getId("mainform").style.height = "0";
	getId("mainform").style.opacity = "0";
	getId("mainform").style.display = "none";
	
	getId("uploading").style.transition = "all 0.25s ease-in-out";
	getId("uploading").style.height = "330px";
	getId("uploading").style.opacity = "1";

	upload();
    }
    selectGIF();
}

function updatePage(response) {
    getId("mainform").style.display = "none";
    
    getId("uploading").style.transition = "all 0.25s ease-in-out";
    getId("uploading").style.height = "0";
    getId("uploading").style.opacity = "0";
    getId("uploading").style.display = "none";
    
    getId("finished").style.transition = "all 0.5s ease-in-out";
    getId("finished").style.height = "330px";
    getId("finished").style.opacity = "1";

    if( (response.search("Error") == -1) && (response.search("ERROR") == -1) ) {
	response = response.split(";EOF");
	getId("file-output").value = "http://" + response[0];
    } else {
	getId("finished").innerHTML = "Sorry, something went wrong :-(";
    }
}

var GIFLIST = ["amazing-shape.gif",   "dancing-ninja.gif",                   "Hovering-MOON-MOON.gif",
	       "I-love-trains.gif",   "Infinite-fall.gif",  "Internet-maintenance.gif",  "Like-a-bus.gif"];

function selectGIF() {
    var index = Math.floor( Math.random() * GIFLIST.length );
    var url = "/testing/gifs/" + GIFLIST[index];

    var pic = document.createElement("img");
    pic.src = url;
    pic.alt = "Funny GIF here";
    pic.style.borderRadius = "5px";
    pic.height = "200";
    pic.style.marginTop = "10px";
    getId("uploading").appendChild(pic);
    
}
