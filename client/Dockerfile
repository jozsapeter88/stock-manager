# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json * (if available)
COPY package*.json ./

# Install project dependenciees
RUN npm install -g npm@latest

# Copy the entire project directory into the container
COPY . .

EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
