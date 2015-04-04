<?php
function clean($string) {
	 $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
	 $string = preg_replace('/[^A-Za-z0-9\-\.]/', '', $string); // Removes special chars.
	 $string = strtolower($string); // Convert to lowercase
	 return $string;
}

function unsupportedExtension($input) {
	$unsupportedExtensions = array("mp3", "exe", "pif", "vid", "ace", "msi", "wma", "mid", "scr");
	$extension = explode(".", $input);

	if( count($extension) >= 2) {
		if( in_array($extension[ count($extension)-1 ],
			$unsupportedExtensions) ) {
			return true;
		}
	}
}

$server = "upper.cf/ul/";
$fileName = clean($_FILES["file"]["name"]);
$fileTmpLoc = $_FILES["file"]["tmp_name"];
//$fileType = $_FILES["file"]["type"];
$fileSize = $_FILES["file"]["size"]; // File size in bytes
//$fileErrorMsg = $_FILES["file"]["error"]; // 0 for false... and 1 for true

if ($fileSize >= 10485760) {
	die("ERROR: Filesize max. 10MB;EOF");
}

if( unsupportedExtension($fileName) ) {
	die("ERROR: unsupported filename extension;EOF");	
}

$path = getcwd() . "/ul/" . $fileName;

// check if filename already exists
// if so, append random number and try again
while(file_exists($path)) {
    $buffer = explode(".", $fileName);
    if(count($buffer) == 1) { // check if there is any file extension
	$buffer[ count($buffer) - 1 ] .= rand(1,15);
    } else {
	$buffer[ count($buffer) - 2 ] .= rand(1,15) . ".";
    }
    $fileName = implode($buffer);
    $path = getcwd() . "/ul/" . $fileName;
}

if(file_exists($path)) {
   die("ERROR: File already exists!");
}

if($fileTmpLoc) {
    if(move_uploaded_file($fileTmpLoc, $path)) {
	echo $server . $fileName . ";EOF"; // due to stupid CwCity Ads
    } else {
	die("ERROR: Upload of " . $fileName . "failed;EOF");
    }
}
?>
