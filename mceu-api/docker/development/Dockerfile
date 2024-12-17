# Use an official node image as the base image
FROM node:20.17-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
RUN npm install -g @nestjs/cli \
    @mikro-orm/cli \
    @mikro-orm/postgresql

# Serve the app
CMD ["sh", "-c", "npm install && npm run build && npm run start:dev"]