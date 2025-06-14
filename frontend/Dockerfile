FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]
