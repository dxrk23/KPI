FROM node:16-alpine3.15 AS dev
WORKDIR /usr/src/app
COPY . .

RUN yarn
COPY . .

RUN yarn build
COPY . .

FROM nginx:1.13-alpine as server
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=dev /usr/src/app/dist .
COPY nginx.conf /etc/nginx/nginx.conf