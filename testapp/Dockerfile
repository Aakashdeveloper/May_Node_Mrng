FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8900
CMD ["npm", "start"]