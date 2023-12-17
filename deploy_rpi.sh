#!/bin/bash

# Download all assets
wget "https://github.com/maximekuhn/rusty-weather/releases/latest/download/rusty-weather-backend"
wget "https://github.com/maximekuhn/rusty-weather/releases/latest/download/rusty-weather-frontend.zip"
wget "https://github.com/maximekuhn/rusty-weather/releases/latest/download/rusty-weather-deploy-files.zip"

# Unzip frontend and deploy files
mkdir deploy
unzip rusty-weather-deploy-files.zip -d deploy
mkdir frontend
unzip rusty-weather-frontend.zip -d frontend

# Delete zip
rm rusty-weather-frontend.zip
rm rusty-weather-deploy-files.zip

# Rearrange files structure
mv deploy/deploy_raspberry_pi/* deploy
rm -rf deploy/deploy_raspberry_pi

mv deploy/docker-compose.yaml .
mv deploy/DockerfileFrontend frontend/Dockerfile
mv deploy/update.sh .

mkdir frontend/nginx/
mv deploy/frontend-nginx-config.conf frontend/nginx/nginx.conf

mkdir backend
mv deploy/DockerfileBackend backend/Dockerfile
mv rusty-weather-backend backend

# Create db file if not exists
[ -e "db.sqlite3" ] || touch db.sqlite3

# Ask for open weather api key
read -p "OpenWeather API key: " open_weather_api_key
sed -i "s/%PLACEHOLDER_OPEN_WEATHER_API_KEY%/$open_weather_api_key/g" docker-compose.yaml

# Start docker compose
docker compose up -d --build