# Use the official Node.js 16 image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema to the container
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the source code inside the Docker image
COPY . .

# Build your NestJS app
RUN npm run build

# Map the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "run", "start:prod"]
