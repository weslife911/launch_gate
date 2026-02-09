#!/bin/bash
echo "BUILD START"

# Install requirements using the bypass flag
python3 -m pip install -r requirements.txt --break-system-packages

# Create the output directory explicitly
mkdir -p staticfiles_build

# Run collectstatic
python3 manage.py collectstatic --noinput --clear

echo "BUILD END"