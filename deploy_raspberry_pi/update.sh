#!/bin/bash

# Shutdown docker compose
docker compose down

# Remove old directories
rm -rf backend
rm -rf deploy
rm -rf frontend

# Remove old files
rm deploy_rpi.sh
rm docker-compose.yaml

# Download and start deploy script
wget https://raw.githubusercontent.com/maximekuhn/rusty-weather/main/deploy_rpi.sh
bash deploy_rpi.sh