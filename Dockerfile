FROM node:18
WORKDIR /app
COPY package.json .env ./
#COPY yarn.lock telegraf.d.ts tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "src/index.js"]
