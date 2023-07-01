# build stage
FROM node:16-alpine as build-stage

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --include=dev

COPY ./build ./build
COPY ./src ./src
COPY ./static ./static
COPY ./eslintignore ./
COPY ./eslintrc.js ./
COPY ./server.js ./
COPY ./tsconfig.json ./
COPY ./stylelintrc.json ./
COPY ./.nvmrc ./

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/build/nginx /etc/nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
