FROM node:18

WORKDIR /app

# Copy package.json and pnpm-lock.yaml from root to /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# Copy only server source files
COPY apps/server .

RUN pnpm build

EXPOSE 8787

CMD ["node", "build/index.js"]