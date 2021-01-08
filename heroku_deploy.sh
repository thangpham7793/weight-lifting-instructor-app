#!/bin/bash

cd ../otago_weight_lifting_club_schedule_app 

echo "Enter commit message: "

read commit_message
echo "Pushing to heroku with commit message: $commit_message"

git add . 
git commit -am "${commit_message}" 
git push