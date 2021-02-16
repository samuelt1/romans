FROM node:14.15.4-alpine

COPY ./package.json ./package.json
RUN npm install --production

EXPOSE 8080

COPY ./node_modules ./node_modules
COPY ./src ./src
COPY ./config ./config
