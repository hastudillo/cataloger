# Stage
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . .

# https://angular.io/guide/workspace-config#alternate-build-configurations
# By default, the ng build command uses the production configuration
RUN npm run build

# Final image
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist  /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]