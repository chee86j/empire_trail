FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies separately for better layer caching
COPY package*.json ./
RUN npm ci --include=dev --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Vite app (tsc runs via npm run build)
ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
