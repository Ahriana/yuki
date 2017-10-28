#!/usr/bin/env bash

### Deprecated ###

exit 0

function export_table {
    echo "SELECT * INTO OUTFILE '$1.csv'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\\n'
FROM $1" | mysql -u yukichan -pyuki yukichan
}

export_table "channel_ignores"
export_table "server_settings"
export_table "user_greetings"
export_table "user_settings"

mv /var/lib/mysql/yukichan/*.csv ./data/csv_files

python3 ./transformer/__main__.py
