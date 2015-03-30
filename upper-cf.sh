#!/bin/bash
# Upload bash script for Upper.cf
# Usage: upper-cf <FILE>

if [ ! "$1" ]; then
	echo "ERROR: You need to specify a file!";
	echo "Usage: upper-cf <FILE>";
	exit 1;
fi 

URL="http://upper.cf/upload.php";

curl -s -F "file=@${1}" "$URL" | head -1 | cut -d";" -f 1;

