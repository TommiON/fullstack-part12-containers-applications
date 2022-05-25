FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

RUN npm ci

CMD ["node", "index.js"]