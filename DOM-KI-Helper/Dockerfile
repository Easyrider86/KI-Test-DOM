FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY ./src/app/api-key /usr/src/assets/api-keys

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]