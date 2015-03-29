<?php
function clean($string) {
	 $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
	 $string = preg_replace('/[^A-Za-z0-9\-\.]/', '', $string); // Removes special chars.
	 $string = strtolower($string); // Convert to lowercase
	 return $string;
}

$server = "upper.cf/ul/";
$fileName = clean($_FILES["file"]["name"]);
$fileTmpLoc = $_FILES["file"]["tmp_name"];
//$fileType = $_FILES["file"]["type"];
//$fileSize = $_FILES["file"]["size"]; // File size in bytes
//$fileErrorMsg = $_FILES["file"]["error"]; // 0 for false... and 1 for true

$path = getcwd() . "/ul/" . $fileName;

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
   echo "ERROR: File already exists!";
}

if($fileTmpLoc) {
    if(move_uploaded_file($fileTmpLoc, $path)) {
	echo $server . $fileName . ";EOF"; // due to stupid CwCity Ads
    } else {
	echo "ERROR: Upload of " . $fileName . "failed";
    }
}
?>
