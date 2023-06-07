#!/bin/bash

# Set the name of the database to backup
DB_NAME="cs_db"

# Set the backup file name and location
BACKUP_DIR="/tmp/pg_backup"
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_$(date +%Y-%m-%d_%H-%M-%S).sql"
PREV_BACKUP="${BACKUP_DIR}/${DB_NAME}_backup_prev.sql"
#pre-req
#export PGPASSWORD=currentpassword
# Run the pg_dump command to create the backup
pg_dump -U cs -F p -f $BACKUP_FILE $DB_NAME


# Check if the backup was successful
if [ $? -eq 0 ]; then
  echo "Backup successful: $BACKUP_FILE"
  
  # Copy the backup file to an S3 bucket
  if [ -f "$PREV_BACKUP" ]; then
    echo "$PREV_BACKUP exists"
    prev_backup_md5=$(md5sum $PREV_BACKUP | awk '{print $1}')
    curr_backup_md5=$(md5sum $BACKUP_FILE | awk '{print $1}')
    
    if [ "$prev_backup_md5" == "$curr_backup_md5" ]; then
      echo "Backup file is same as previous backup file. Not copying to S3"
      exit 0
    else
      echo "Backup file is different from previous backup file. Copying to S3"
      aws s3 cp $BACKUP_FILE s3://stratoclo-proj/db_backup/
  
      if [ $? -eq 0 ]; then
        echo "Backup file copied to S3"
        mv $BACKUP_FILE $PREV_BACKUP
      else
        echo "Failed to copy backup file to S3"
      fi
    fi
  else
    echo "Previous backup file not found. Copying backup file to S3"
    aws s3 cp $BACKUP_FILE s3://stratoclo-proj/db_backup/
  
    if [ $? -eq 0 ]; then
      echo "Backup file copied to S3"
      mv $BACKUP_FILE $PREV_BACKUP
    else
      echo "Failed to copy backup file to S3"
    fi
  fi
else
  echo "Backup failed"
fi
