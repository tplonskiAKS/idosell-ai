FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx ts-node index.ts

EXPOSE 3000

CMD ["npx", "ts-node", "index.ts"]
