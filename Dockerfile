FROM node:16-alpine as builder

WORKDIR /usr/src/app/reactapp

COPY . ./

COPY package.json ./

RUN npm install --force

RUN npm run build

FROM nginx

COPY --from=builder /usr/src/app/reactapp/build /usr/share/nginx/html

RUN rm -rf /usr/src/app/reactapp

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]