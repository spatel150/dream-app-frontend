# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /dream-app-frontend

# Copy the package.json and package-lock.json files
COPY public/ /dream-app-frontend/public
COPY src/ /dream-app-frontend/src
COPY package.json /dream-app-frontend/

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Serve the application
CMD ["npx", "serve", "-s", "build"]
