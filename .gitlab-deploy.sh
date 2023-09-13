#!/bin/bash

set -f 
string=$APP_SERVER_URL
array=(${string//,/ })

for i in "${!array[@]}" ; do
     echo "Deploy on instance1"
    ssh -v -o ProxyCommand="ssh -v -W %h:%p -i ~/.ssh/id_rsa ${4}@${5}" -i ~/.ssh/id_rsa_app ${3}@${i}  "cd Enzo/checkin/repo/checkin/checkin/ && git pull https://${1}:${2}@gitlab.com/enzo-software-development/checkin.git develop && npm install"
 
done
