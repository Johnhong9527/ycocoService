# ycocoService

# start mongodb
```bash
cd ~/Code/docker/ycocoservice
docker run -p 27017:27017 -v $PWD/db:/data/db -d mongo:latest
```