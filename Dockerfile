FROM node:alpine

WORKDIR /home/node/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --production

EXPOSE 8080

COPY ./node_modules ./node_modules
COPY ./src ./src
COPY ./config ./config

CMD [ "node", "src/index.js" ]
