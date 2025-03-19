FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3001
ENV MONGO_URI_AUTH=mongodb://auth-db:27017/auth
ENV MONGO_URI_TASKS=mongodb://tasks-db:27017/tasks
ENV JWT_SECRET=secret-key

EXPOSE 3001

CMD ["node", "src/main.js"]