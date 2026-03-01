#!/bin/bash
echo "BUILD START"

python3 -m pip install -r requirements.txt --break-system-packages

mkdir -p staticfiles_build

python3 manage.py collectstatic --noinput --clear

echo "BUILD END"