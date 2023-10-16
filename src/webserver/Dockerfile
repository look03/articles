FROM node:16.1

RUN mkdir /var/log/node

WORKDIR /app
RUN npm install -g nodemon

COPY app/package.json app/

RUN npm install

COPY app/ app/

CMD npm run start:dev
#CMD ["node", "./dist/src/main.js"]