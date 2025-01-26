FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:alpine

COPY ./apache.conf /usr/local/apache2/conf/apache.conf
RUN echo "Include /usr/local/apache2/conf/apache.conf" >> /usr/local/apache2/conf/httpd.conf

COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
COPY ./public/logo.svg /usr/local/apache2/htdocs/logo.svg
EXPOSE 80
CMD ["httpd-foreground"]
