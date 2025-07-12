FROM node:20-alpine

# Instalar dependencias necesarias para nodemon, chokidar y herramientas básicas
RUN apk add --no-cache bash git libc6-compat

WORKDIR /app

# Crear carpeta para subir archivos
RUN mkdir -p /app/uploads

# Copiar los package.json
COPY package*.json ./

# Instalar NestJS CLI globalmente (para que funcione 'nest start')
RUN npm install -g @nestjs/cli

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (opcional si no está en docker-compose)
EXPOSE 3000

# Usar el Nest CLI en modo desarrollo con watch
CMD ["npm", "run", "start:dev"]
