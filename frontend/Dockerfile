# Use the official Node.js image from the Docker Hub
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY . .

# Install the frontend dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application
# RUN npm run build

# # Use the official Nginx image to serve the React app
# FROM nginx:alpine

# # Copy the build files from the previous stage
# COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 3000

# Command to run Nginx
CMD ["npm", "start"]
