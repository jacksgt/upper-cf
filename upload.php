<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="//use.edgefonts.net/vera-sans.js"></script>
  <title>Your File has been uploaded!</title>
  <link rel="stylesheet" type="text/css" href="main.css">
  <style>
    main { text-align: center; color: #FFFFFF; }
    a.link { color: #222222; } 
  </style>
</head>
<body>
<div id="wrapper">
  <a href="http://www.upper.cf" target="_self" class="nounderline">
  <header>
    <div id="banner"><div id="maincolor">Upper</div><div id="subcolor">.cf</div></div>
    <div id="description">Upload Files. Simple.</div>
  </header>
  </a>
  <main>
    <h2>Your File has been uploaded successfully!</h2>
    <p>Simply copy & paste the following link:</p>
    <div id="link">

<?php
// specify the name of the server
$server = "upper.cf";
// specify disallowed filetypes
$disallowed_filetypes = array(".exe",".mp3",".pif",".ace",".msi",".wma",".mid", ".scr");
// specify maximum file size
$max_filesize = 10485760; // bytes = 10MB
// specify upload directory
$uploaddir = "ul/";
// create path + name of file
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
//isolate the file type extension
$extension = substr($filename, strpos($filename,"."), strlen($filename)-1);

// check if file does already exist
if (file_exists($uploaddir . $_FILES["file"]["name"])) {
  die("Please choose a different filename.");
}

// check for file type extension
if(in_array($extension, $disallowed_filetypes)) {
  die("This file type is not allowed. Do not upload EXE, MSI, ACE, PIF, WMA, SCR or MP3 Files");
}

// check for filesize
if(filesize($_FILES["file"]["tmp_name"]) > $max_filesize) {
  die("This file is too big. Do not upload files larger than 10MB.");
}

$completepath = $server . "/" . $uploaddir . $_FILES["file"]["name"];

// Upload file
move_uploaded_file($_FILES["file"]["tmp_name"], $uploaddir . $_FILES["file"]["name"]);

echo "<div id='dir'><a href='http://" . $completepath . "'>" . $completepath . "</a></div>"; 

// Debugging Info
//echo '<pre>';
//echo 'Here is some more debugging info:';
//print_r($_FILES);
//echo "</pre>";

?>

  </div>
 </main>
</div>
<footer>
    By using the service <a href="http://upper.cf">Upper.cf</a> you are
    agreeing to our <div id="terms" onclick="viewTOS()">Terms of Service</div>
</footer>
</body>
</html>
