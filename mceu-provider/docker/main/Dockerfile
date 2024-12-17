# Use an official node image as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm i -g serve

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Serve the app
# CMD ["sh", "-c", "npm install && npm run build && serve -s -n dist"]

# Command to run the application in development mode
CMD ["sh", "-c", "npm install && npm run dev -- --host"]