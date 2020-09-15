FROM node:14.10.0-buster-slim AS build-app
WORKDIR /usr/src/app
COPY . .
RUN npm install --no-audit --unsafe-perm
RUN npm run build

FROM node:14.10.0-buster-slim AS build-runtime
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production --unsafe-perm

FROM node:14.10.0-buster-slim
WORKDIR /usr/src/app
COPY --from=build-app /usr/src/app/__sapper__ ./__sapper__
COPY --from=build-app /usr/src/app/static ./static
COPY --from=build-runtime /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "__sapper__/build"]
