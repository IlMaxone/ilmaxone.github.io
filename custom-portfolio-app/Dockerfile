FROM node:24-alpine3.22 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY angular.json tsconfig*.json ./
COPY scripts ./scripts
COPY content ./content
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.29-alpine3.22 AS preview
COPY nginx.preview.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/custom-portfolio-app/browser/ /usr/share/nginx/html/
EXPOSE 80
