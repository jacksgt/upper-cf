#!/bin/bash
# Upload bash script for Upper.cf
USAGE="upper-cf [OPTION] <FILE>";
OPTIONS="-p, --progress-bar: enables cURL progress bar (useful for bigger files)"; 

URL="http://upper.cf/upload.php";

if [ ! "$1" ]; then
	echo "ERROR: You need to specify a file!";
	echo "Usage: $USAGE";
	echo "Options: $OPTIONS";
	exit 1;
fi

if [[ "$1" == "-p" ]] || [[ "$1" == "--progress-bar" ]]; then
	curl --progress-bar -F "file=@${2}" "$URL" | head -1 | cut -d";" -f 1;
else
	curl -s -F "file=@${1}" "$URL" | head -1 | cut -d";" -f 1;
fi


