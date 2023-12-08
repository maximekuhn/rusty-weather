#!/bin/bash

# Shutdown docker compose
docker compose down

# Remove old directories
rm -rf backend
rm -rf deploy
rm -rf frontend

# Remove docker compose file
rm docker-compose.yaml

# Run deploy_rpi.sh again
bash deploy_rpi.sh