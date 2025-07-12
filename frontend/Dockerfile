# Etapa base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json para instalar deps
COPY package*.json ./

# Instala dependencias (usar npm ci si tenés lockfile)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto donde CRA corre por defecto
EXPOSE 3000

# Inicia el frontend
CMD ["npm", "start"]



# # Etapa base
# FROM node:18

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# ENV CHOKIDAR_USEPOLLING=true

# CMD ["npm", "start"]
