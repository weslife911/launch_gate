#!/bin/bash
echo "BUILD START"

# Use python3 to match the environment version
python3 -m pip install -r requirements.txt

# Ensure the output directory exists
mkdir -p staticfiles_build

# Run collectstatic
python3 manage.py collectstatic --noinput --clear

echo "BUILD END"