#!/bin/bash

PUBLIC_FOLDER_PATH="../otago_weight_lifting_club_schedule_app/src/backend/public"

clean_up_build_folder() {
    if [ -d instructor/ ]; then 
        rm -rf instructor/ 
    fi
}

clean_up_build_folder

# build prod bundle
npm run build
# rename bundle
mv build/ instructor/ 

echo "Finished building bundle"

# remove old bundle on backend
if [ -d "${PUBLIC_FOLDER_PATH/instructor}" ]; then
    echo "Removing instructor app folder in backend public folder..."
    rm -r ${PUBLIC_FOLDER_PATH/instructor} || echo "Failed to remove"
fi

# create instructor folder in public folder
mkdir ${PUBLIC_FOLDER_PATH/instructor}

# move new bundle to backend
echo "Copying new bundle to backend public folder..."
cp -r instructor/ ../otago_weight_lifting_club_schedule_app/src/backend/public/ || echo "Failed to copy new bundle"

echo "Finished deploying new bundle"

# clean up
clean_up_build_folder