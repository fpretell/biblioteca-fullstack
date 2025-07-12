# # Usa una imagen liviana de Node con Alpine
# FROM node:20-alpine

# # Instala herramientas necesarias
# RUN apk add --no-cache bash git libc6-compat

# # Establece el directorio de trabajo
# WORKDIR /app

# # Crea carpeta para imágenes subidas
# RUN mkdir -p /app/uploads

# RUN npm install -g @nestjs/cli

# # Copia los archivos de dependencias
# COPY package*.json ./

# # Instala las dependencias (incluye devs como @types/node)
# RUN npm install

# # Copia el resto del proyecto
# COPY . .

# # Compila el proyecto NestJS (usa tu script "build": "nest build")
# RUN npm run build

# # Expone el puerto
# EXPOSE 3000

# # Corre el backend compilado
# # CMD ["npm", "run", "start:prod"]
# CMD ["nest", "start", "--watch"]
# # CMD ["npx", "nest", "start", "--watch"]
FROM node:20-alpine

# Instalar utilidades necesarias
RUN apk add --no-cache bash git

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y lock
COPY package*.json ./

# Instalar Nest CLI global
RUN npm install -g @nestjs/cli

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:dev"]
