FROM node:16-slim

RUN apt update && apt upgrade -y
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g npm
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN chown -R node:node /usr/src/app
USER node

ENV FLAG=inctfj{cl3ver_w4y_t0_g3t_1t}

EXPOSE 3000
CMD [ "node", "app.js" ]
