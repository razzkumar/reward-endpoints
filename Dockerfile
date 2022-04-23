FROM node:18-alpine as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

# Create production build
FROM node:18-alpine as prod

WORKDIR /app

COPY package*.json ./

RUN npm install --only-production

COPY . .

EXPOSE 4000

ENTRYPOINT [ "node" ]

CMD [ "src/index.js" ]
