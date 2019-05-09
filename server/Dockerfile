FROM node:alpine

WORKDIR /graphql

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install --production

COPY . . 

RUN npx prisma generate

EXPOSE 4000

CMD ["node", "src/index.js"]