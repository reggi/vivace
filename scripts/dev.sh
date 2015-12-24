#!/bin/bash

FAIL=0

echo "starting dev servers, output will be mixed - press CTRL+c to quit"

NO_REDIS=true DATA_SOURCE_URL="'http://localhost:3000'" NODE_ENV=production node server &
json-server ./scripts/fakeData.js &


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
