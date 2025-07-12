# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["node", "dist/main.js"]

FROM node:20-alpine

# Instalar dependencias necesarias para nodemon y chokidar en Alpine
RUN apk add --no-cache bash git libc6-compat

WORKDIR /app

RUN mkdir -p /app/uploads

COPY package*.json ./

RUN npm install

COPY . .

# Usa Nest CLI en modo watch
CMD ["npm", "run", "start:dev"]


