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

# Dependencias necesarias para chokidar y herramientas básicas
RUN apk add --no-cache bash git libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

# Instalamos dependencias (incluye nest local)
RUN npm install
RUN npm install --save-dev @types/node @types/express

COPY . .

# Usar el ejecutable local de nest vía npx
CMD ["npx", "nest", "start", "--watch"]
