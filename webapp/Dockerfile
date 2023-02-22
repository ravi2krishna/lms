# Docker file for react app created using vite
FROM node:latest as build
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Build app
COPY . .
RUN npm run build

# Docker file for nginx server to serve react app build files (spa routing)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# This is required to make nginx serve index.html for all routes
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
# If you add a custom CMD in the Dockerfile, be sure to include -g daemon off; 
# in the CMD in order for nginx to stay in the foreground, so that Docker can 
# track the process properly (otherwise your container will stop immediately after starting)!
CMD ["nginx", "-g", "daemon off;"]
