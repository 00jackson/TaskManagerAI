# Use an official Node runtime as a parent image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy all source files
COPY . .

# Build the TypeScript code (adjust if using other commands)
RUN pnpm build

# Expose the port the app runs on
EXPOSE 8787

# Run the app
CMD ["node", "build/index.js"]