## Use the official Node.js 16 image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# Build your NestJS app
RUN npm run build

# Map the port the app runs on
EXPOSE 8080

# Command to run the app
CMD [ "npm", "run", "start:prod" ]
