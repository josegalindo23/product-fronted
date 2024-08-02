# Guide: https://medium.com/@nadir.inab.dev/dockerizing-your-angular-app-a-quick-guide-00a3ecabe419

# Etapa de construcción
# FROM node:18.13.0 as build

# # Establece el directorio de trabajo
# WORKDIR /app

# # Copia package.json y package-lock.json (si existe)
# COPY package*.json ./

# # Instala las dependencias
# RUN npm install

# RUN npm install -g @angular/cli

# # Copia el resto de los archivos del proyecto
# COPY . .

# # Construye la aplicación
# RUN npm run build -- --prod

# RUN ng build --configuration=production

### STAGE 2: Run ###
FROM nginxinc/nginx-unprivileged

#### copy nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

#### copy artifact build from the 'build environment'
COPY /dist/angular-for-product/browser /usr/share/nginx/html

#### don't know what this is, but seems cool and techy
CMD ["nginx", "-g", "daemon off;"]