## Instalación

Antes de comenzar, asegúrate de tener instalado lo siguiente:
* [NodeJS y NPM](https://nodejs.org/)

### Configuración de entornos

Antes de ejecutar la aplicación, asegúrate de configurar correctamente las variables de entorno. 
Aquí hay una guía general para los archivos `.env`:

********* api/.env ********* 
```bash
NODE_ENV=development
JWT_SECRET=TU_SECRETO_JWT
SESSION_SECRET=TU_SECRETO_SESION
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-de-la-base-de-datos?retryWrites=true&w=majority
PORT=3000

Descripción de las variables:
NODE_ENV: Modo de entorno de la aplicación (development o production).
JWT_SECRET: Secreto para la firma de tokens JWT.
SESSION_SECRET: Secreto para la gestión de sesiones de usuario.
MONGODB_URI: URI para conectarse a la base de datos MongoDB (modifica usuario, contraseña, y nombre-de-la-base-de-datos).
PORT: Puerto en el que la API se ejecutará (por defecto 3000).
```

Nota: Para desplegar en Render (backend), debes configurar estas variables de entorno en el panel de Render.

### Generar claves secretas

Dentro de la carpeta /api, hay un script para generar automáticamente JWT_SECRET y SESSION_SECRET.
Puedes usar el siguiente comando desde el directorio /api:

```bash
node generateSecrets.js
```

### Instalación de dependencias

Instalar las dependencias de ambos proyectos siguiendo este script:

```bash

cd api
npm install --production
cd ../ui
npm install --production

```
### Ejecución de la aplicación en desarrollo

Para testear la aplicación, ejecuta (desde ui y api en diferentes terminales):

```bash
npm run dev

```


