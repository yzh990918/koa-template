FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install 

EXPOSE 3000
CMD ["node", "app.js"]
