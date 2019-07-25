FROM node:11-alpine AS builder
COPY . .
WORKDIR /app
RUN npm install
RUN npm run build:prod:en

FROM nginx:1-alpine
COPY --from=builder /dist/browser/ /usr/share/nginx/html
EXPOSE 80