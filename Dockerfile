#app Player Build APP

# build environment
FROM node:12.2.0-alpine as build

USER root
RUN rm -rf /home/node/app
# non-root user node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apk update && apk add git

RUN which git

WORKDIR /home/node/app

ENV PATH /home/node/app/node_modules/.bin:$PATH

COPY package.json .

USER node

RUN npm i --production

COPY --chown=node:node . .


CMD node app.js

# production environment
# TO be add
# RUN npm run prod