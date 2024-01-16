FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY .env ./

# Install dependencies
RUN yarn install

COPY . .

# Build the application
RUN yarn build

CMD ["npm","run","start-dev"]