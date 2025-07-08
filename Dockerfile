# 1단계: 빌드용
FROM node:16.13.2 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN CI=false GENERATE_SOURCEMAP=false npm run build

# 2단계: 배포용
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]