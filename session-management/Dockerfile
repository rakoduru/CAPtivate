FROM node:10
WORKDIR /session-management
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3005
CMD [ "node", "session-management.js" ]