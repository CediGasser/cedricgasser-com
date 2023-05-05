# syntax=docker/dockerfile:1

FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:16-alpine
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
ENV PORT 443
EXPOSE ${PORT}
CMD ["node","build"]