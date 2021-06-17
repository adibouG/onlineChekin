#!/bin/bash

set -f 
string=$APP_SERVER_URL
array=(${string//,/ })

for i in "${!array[@]}" ; do
    echo "Deploy on ${array[i]}"
    ssh -v -o ProxyCommand="ssh -v -W %h:%p -i ~/.ssh/id_rsa gitdeploy@34.244.245.12" -i ~/.ssh/id_rsa_app ec2-user@10.0.0.47  "cd Enzo/checkin/repo/checkin/checkin/ && git pull https://${1}:${2}@gitlab.com/enzo-software-development/checkin.git develop && npm install"
done
