# syntax=docker/dockerfile:1

# --- Build stage: собираем Angular-приложение ---
FROM node:20-alpine AS build

WORKDIR /app

# Ставим зависимости отдельно от исходников, чтобы кэшировать слой
COPY package.json package-lock.json ./
RUN npm ci

# Собираем прод-бандл (npm run build == ng build, defaultConfiguration: production)
COPY . .
RUN npm run build

# --- Runtime stage: раздаём статику через nginx ---
FROM nginx:stable-alpine AS runtime

# Конфиг с SPA-fallback и gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular application builder кладёт клиентские файлы в подпапку browser/
COPY --from=build /app/dist/studio-galaxy/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
