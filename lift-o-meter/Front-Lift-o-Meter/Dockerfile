FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL="http://localhost:3001"

RUN CI=true npm run test

RUN npm run build

CMD npm run start-prod