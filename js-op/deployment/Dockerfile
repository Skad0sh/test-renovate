FROM node:16-slim

RUN apt update && apt upgrade -y
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g npm
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
RUN npm install
COPY . .
RUN chown -R node:node /usr/src/app
USER node

EXPOSE 1339
CMD [ "node", "app.js" ]
