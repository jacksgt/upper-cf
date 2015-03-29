<?php
function clean($string) {
	 $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
	 $string = preg_replace('/[^A-Za-z0-9\-\.]/', '', $string); // Removes special chars.
	 $string = strtolower($string); // Convert to lowercase
	 return $string;
}
$server = "upper.cf/testing/ul/";
$fileName = clean($_FILES["file"]["name"]);
$fileTmpLoc = $_FILES["file"]["tmp_name"];
//$fileType = $_FILES["file"]["type"];
//$fileSize = $_FILES["file"]["size"]; // File size in bytes
//$fileErrorMsg = $_FILES["file"]["error"]; // 0 for false... and 1 for true

$path = getcwd() . "/ul/" . $fileName;

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
