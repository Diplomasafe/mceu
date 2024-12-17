FROM node:20.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli @mikro-orm/cli @mikro-orm/postgresql
    
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start:prod"]
