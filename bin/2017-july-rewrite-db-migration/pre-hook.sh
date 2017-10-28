#!/usr/bin/env bash

### Deprecated ###

exit 0

if [[ ! -e ./data ]]
then
    mkdir ./data
fi

if [[ ! -e ./data/csv_files ]]
then
    mkdir ./data/csv_files
fi

if [[ ! -e ./data/json_files ]]
then
    mkdir ./data/json_files
fi

cd migrator && yarn install && cd ..
