#!/bin/bash

FAIL=0

echo "starting dev servers, output will be mixed - press CTRL+c to quit"

node server &


for job in `jobs -p`
do
echo $job
    wait $job
done

echo $FAIL

if [ "$FAIL" == "0" ];
then
echo "YAY!"
else
echo "FAIL! ($FAIL)"
fi
