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

# Move all files in deploy to working directory
mv deploy/deploy_raspberry_pi/* .
rm -rf deploy
rm README.md