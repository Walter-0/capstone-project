FROM node:lts

WORKDIR /app

COPY ./package.json /app

RUN yarn install

COPY . /app

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "dev"]
