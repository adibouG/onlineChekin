#!/bin/bash

set -f 
string=$DEPLOY_SERVER_URL
array=(${string//,/ })

for i in "${!array[@]}" ; do
    echo "Deploy on ${array[i]}"
    ssh gitdeploy@${array[i]} "../ubuntu/Enzo/scripts/checkin/checkin_ssh_1.sh && cd /home/ec2-user/Enzo/checkin/repo/checkin/checkin && git pull https://${1}:${2}@gitlab.com/enzo-software-development/checkin.git develop && npm install"
done
