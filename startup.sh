#!/bin/bash
# Override NODE_PATH to use our app's node_modules, not Azure's cached /node_modules
export NODE_PATH=/home/site/wwwroot/node_modules
export PATH=/home/site/wwwroot/node_modules/.bin:$PATH
cd /home/site/wwwroot
node server.js
