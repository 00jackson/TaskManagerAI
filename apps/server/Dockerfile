# Dockerfile (place this inside apps/server/)
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8787

CMD ["node", "build/index.js"]