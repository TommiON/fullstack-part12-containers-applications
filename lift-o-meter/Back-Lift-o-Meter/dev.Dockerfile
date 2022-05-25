FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

RUN npm install

CMD ["node", "index.js"]