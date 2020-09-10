# Serve

FROM node:14.10.0 as server

#RUN echo 1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save-dev  --unsafe-perm node-sass
RUN npm install
COPY . .


RUN npm run build

CMD ["node","__sapper__/build"]
