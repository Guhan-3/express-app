FROM node

ENV MONGO_DB_USERNAME=admin\
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

copy . /home/app

cmd ["node", "/home/app/server.js"]
