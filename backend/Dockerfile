# Usa imagen base oficial de Node
FROM node:20-alpine

# Instala bash y git
RUN apk add --no-cache bash git

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia primero package.json y lockfile
COPY package*.json ./

# Instala dependencias (incluye los tipos porque ya están en devDependencies)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto Nest
EXPOSE 3000

# Ejecuta Nest en modo desarrollo (watch)
CMD ["npm", "run", "start:dev"]
