FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]