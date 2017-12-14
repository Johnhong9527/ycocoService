#!/bin/sh
sudo git pull
sudo forever stop 0
sudo forever start ./bin/www
