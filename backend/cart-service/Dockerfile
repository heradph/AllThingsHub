FROM node:20.18.0
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . . 
RUN chmod +x /app/wait-for-it.sh
EXPOSE 3001
CMD ["node", "cart.js"]