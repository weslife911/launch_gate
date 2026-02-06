#!/bin/bash

echo "BUILD START"

# Create a virtual environment to avoid "externally-managed-environment" error
python3.12 -m venv venv
source venv/bin/activate

# Install requirements within the virtual environment
pip install --upgrade pip
pip install -r requirements.txt

# Run collectstatic
python3.12 manage.py collectstatic --noinput --clear

echo "BUILD END"