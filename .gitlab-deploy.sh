#!/bin/bash

set -f 
string=$DEPLOY_SERVER_URL
array=(${string//,/ })

for i in "${!array[@]}" ; do
    echo "Deploy on ${array[i]}"
    ssh -t gitdeploy@${array[i]} "sudo ssh -t -i /home/ubuntu/Enzo/keys/checkin.pem ec2-user@10.0.0.47 && whoami && pwd && echo 'connected' && cd ~/Enzo/checkin/repo/checkin/checkin && git pull https://${1}:${2}@gitlab.com/enzo-software-development/checkin.git develop && npm install"
done
