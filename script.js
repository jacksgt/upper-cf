function getId(id) { return document.getElementById(id); }

window.onload = function () {
    getId("fileform").onsubmit = function(event) { event.preventDefault(); upload(); }
    selectGIF();

    var dropZone = document.getElementById('dd-wrapper');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

}

function upload(file) {
    if(!file) {
	var file = getId("fileform").file.files[0];
    }
    if(file != undefined && file.fileSize > 10485760) {
     	alert("Your file is too big! (Max. 10MB)");
     	return 1;
    }

    transitionUploading();
    
    var formData = new FormData();
    formData.append("file", file);
    
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

function updatePage(response) {
    transitionFinished();
    
    if( (response.search("Error") == -1) && (response.search("ERROR") == -1) ) {
	response = response.split(";EOF");
	getId("file-output").value = "http://" + response[0];
    } else {
	getId("finished").innerHTML = "Sorry, something went wrong :-(";
    }
}

function handleFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files;

    console.log(files);
    console.log(files[0]);

    upload(files[0]);
    // // files is a FileList of File objects. List some properties.
    // var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    // 	output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //                 f.size, ' bytes, last modified: ',
    //                 f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    //                 '</li>');
    // }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(event) {
    event.stopPropagation(); event.preventDefault(); event.dataTransfer.dropEffect = 'copy';
}

var GIFLIST = ["akward-moment.gif", "Infinite-fall.gif",
	       "amazing-shape.gif", "Internet-maintenance.gif",	      
	       "dancing-ninja.gif", "Like-a-bus.gif",
	       "double-circle-rotation.gif", "loading-screen.gif",      
	       "Grandeur-of-the-Universe.gif", "sport-rotation.gif",     
	       "Hovering-MOON-MOON.gif","That-Horse-is-going-places.gif",
	       "I-love-trains.gif", "This-gif-just-blew-my-mind.gif"
	      ];

function selectGIF() {
    var index = Math.floor( Math.random() * GIFLIST.length );
    var url = "/gifs/" + GIFLIST[index];

    var pic = document.createElement("img");
    pic.src = url;
    pic.alt = "Funny GIF here";
    pic.style.borderRadius = "5px";
    pic.height = "200";
    pic.style.marginTop = "10px";
    getId("uploading").appendChild(pic);    
}

function transitionUploading() {
    getId("form").style.transition = "all 0.25s ease-in-out";
    getId("form").style.height = "0";
    getId("form").style.opacity = "0";
    getId("form").style.display = "none";
    
    getId("uploading").style.transition = "all 0.25s ease-in-out";
    getId("uploading").style.height = "330px";
    getId("uploading").style.opacity = "1";
}

function transitionFinished() {
    getId("form").style.display = "none";
    
    getId("uploading").style.transition = "all 0.25s ease-in-out";
    getId("uploading").style.height = "0";
    getId("uploading").style.opacity = "0";
    getId("uploading").style.display = "none";
    
    getId("finished").style.transition = "all 0.5s ease-in-out";
    getId("finished").style.height = "330px";
    getId("finished").style.opacity = "1";

}


function viewTOS() { // show terms of service
    if( document.getElementById("overlay").style.display == "block" ) {
	getId("overlay").style.display = "none";
    } else {
	getId("overlay").style.display = "block";
    }
}
