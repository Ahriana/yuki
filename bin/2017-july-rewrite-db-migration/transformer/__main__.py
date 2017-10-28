#!/usr/bin/env python3

### Deprecated ###

import csv
import json
import os

if not os.path.exists('./json_files'):
    os.makedirs('./json_files')

definitions = [
    (
        'channel_ignores',
        [
            {
                'name': 'id',
                'type': 'int',
            },
            {
                'name': 'channel_id',
                'type': 'int',
            },
        ],
    ),
    (
        'server_settings',
        [
            {
                'name': 'id',
                'type': 'int',
            },
            {
                'name': 'guild_id',
                'type': 'int',
            },
            {
                'name': 'channel_id',
            },
            {
                'name': 'settings',
            },
            {
                'name': 'disabled_commands',
            },
        ],
    ),
    (
        'user_greetings',
        [
            {
                'name': 'id',
                'type': 'int',
            },
            {
                'name': 'userid',
                'type': 'int',
            },
            {
                'name': 'greeting',
            },
        ],
    ),
    (
        'user_settings',
        [
            {
                'name': 'id',
                'type': 'int',
            },
            {
                'name': 'user_id',
                'type': 'int',
            },
            {
                'name': 'user_profile',
            },
        ],
    ),
]

filepath = os.path.dirname(os.path.realpath(__file__))

for (filename, columns) in definitions:
    records = []

    with open(f'{filepath}/../data/csv_files/{filename}.csv', 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        json_filename = filename.replace('.csv', '.json')

        for row in reader:
            from pprint import pprint
            pprint(row)
            record = {}

            for (columnNumber, columnValue) in enumerate(row):
                try:
                    columnInfo = columns[columnNumber]
                except IndexError:
                    print(columns, columnNumber, columnValue, row)
                    exit()

                record[columnInfo['name']] = columnValue

            records.append(record)

        #  with open(f'{filepath}/../data/json_files/{json_filename}', 'w') as jf:
        #    json.dump(rows, jf)
