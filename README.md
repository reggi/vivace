#Vivace


[![Circle CI](https://circleci.com/gh/inrhythm/vivace.svg?style=svg)](https://circleci.com/gh/inrhythm/vivace)

[![Coverage Status](https://coveralls.io/repos/inrhythm/vivace/badge.svg?branch=develop&service=github)](https://coveralls.io/github/inrhythm/vivace?branch=develop)

[![Stories in Ready](https://badge.waffle.io/inrhythm/vivace.png?label=ready&title=Ready)](http://waffle.io/inrhythm/vivace)

#Getting started

1. ```npm install```
2. ```npm run dev```
3. Setup environment variables and Redis
4. Open browser to http://localhost:8001

##Redis

For development purposes, install [Docker Toolbox](https://www.docker.com/docker-toolbox), fire up Kitematic and install redis container through it to get a working Redis server with nearly zero config.
Set the following env variable for your Redis DB host and port.

```export REDIS_PORT=32768```

```export REDIS_HOST=192.168.99.100```

## Running tests
1. ```npm test```
