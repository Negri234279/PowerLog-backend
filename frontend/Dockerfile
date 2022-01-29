FROM node:14-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the PowerLog frontend react app."
LABEL maintainer = "rafalejo01@gmail.com"

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install -s

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]