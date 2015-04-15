#!/bin/bash
# Upload bash script for Upper.cf
USAGE="upper-cf [OPTIONS] <FILE>";
OPTIONS=" -p, --progress-bar: enables cURL progress bar (useful for bigger files)
 -s, --short-url creates a very short URL using Shorter.cf
 -h, --help print this help text"; 

UPPER_URL="http://upper.cf/upload.php";
SHORTER_URL="http://shorter.cf/short-url.php";

if [ ! "$1" ] || [[ "$@" =~ "-h" ]] || [[ "$@" =~ "--help ]]; then
	echo "ERROR: You need to specify a file!";
	echo "Usage: $USAGE";
	echo -e "Options: \n$OPTIONS";
	exit 1;
fi

_FILE=$BASH_ARGV

if [[ "$@" =~ "-p" ]] || [[ "$@" =~ "--progress-bar" ]]; then
    OPT_PROGRESS=true
fi

if [[ "$@" =~ "-s" ]] || [[ "$@" =~ "--short-url" ]]; then
    OPT_SHORT=true
fi


if [[ $OPT_PROGRESS == "true" ]]; then
    URL=$(curl --progress-bar -F "file=@${_FILE}" "$UPPER_URL" | head -1 | cut -d";" -f 1);
else
    URL=$(curl -s -F "file=@${_FILE}" "$UPPER_URL" | head -1 | cut -d";" -f 1);
fi

if [[ $OPT_SHORT == "true" ]]; then
    URL=$(curl -s -F "url=http://${URL}" "$SHORTER_URL" | head -1 | cut -d";" -f 1);
fi

echo $URL;



