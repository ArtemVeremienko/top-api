FROM node:16-alpine
WORKDIR /usr/app
ADD package*.json .
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD ["node", "./dist/main.js"]
