# syntax=docker/dockerfile:1

FROM node:lts

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
