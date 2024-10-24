## Aplicación en vivo

Puedes ver la aplicación de prueba desplegada en [Vercel](https://e-learning-red-panda-school.vercel.app/).

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
PORT=3000 (para local)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

Descripción de las variables:
NODE_ENV: Modo de entorno de la aplicación (development o production).
JWT_SECRET: Secreto para la firma de tokens JWT.
SESSION_SECRET: Secreto para la gestión de sesiones de usuario.
MONGODB_URI: URI para conectarse a la base de datos MongoDB (modifica usuario, contraseña, y nombre-de-la-base-de-datos).
PORT: Puerto en el que la API se ejecutará (por defecto 3000).
CLOUDINARY_CLOUD_NAME: El nombre de tu cuenta en Cloudinary para la gestión de imágenes.
CLOUDINARY_API_KEY: La clave de API de Cloudinary.
CLOUDINARY_API_SECRET: El secreto de API de Cloudinary.

```

Nota: Para desplegar en Render (backend), debes configurar estas variables de entorno en el panel de Render.

### Generar claves secretas

Dentro de la carpeta /api, hay un script para generar automáticamente JWT_SECRET y SESSION_SECRET.
Puedes usar el siguiente comando desde el directorio /api:

```bash
node scripts/generateSecrets.js
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

### Explicación del Script de Reseteo Automático

La aplicación está configurada para que, cada hora, se ejecute un script de reseteo automático que restaura la base de datos y las imágenes de Cloudinary a un estado predeterminado. Esto asegura que los datos de prueba se mantengan consistentes y que cualquier cambio hecho por los usuarios sea revertido de forma periódica.
#### ¿Qué hace el script?
Base de datos: Elimina todos los usuarios y cursos, excepto un usuario administrador y un curso de ejemplo.
Cloudinary: Elimina cualquier imagen que no esté asociada al curso de ejemplo, asegurando que el almacenamiento de imágenes permanezca limpio.
#### Ejecución manual del script
Si deseas ejecutar el script de reseteo manualmente, puedes hacerlo ejecutando el siguiente comando en el directorio /api:


```bash
node scripts/resetData.js
```


#### Ejecución automática con GitHub Actions
La ejecución automática del script cada hora se gestiona mediante un GitHub Action. Si deseas configurar o modificar esta automatización, sigue los siguientes pasos:
1. Configura los secretos en GitHub: Debes asegurarte de que las siguientes variables estén configuradas como Secrets en tu repositorio de GitHub:
```bash
MONGO_URI: URI de conexión para la base de datos.
CLOUDINARY_CLOUD_NAME: Nombre de tu cuenta en Cloudinary.
CLOUDINARY_API_KEY: Clave de API de Cloudinary.
CLOUDINARY_API_SECRET: Secreto de API de Cloudinary.
ADMIN_ID: ID del usuario administrador de prueba.
ADMIN_EMAIL: Correo electrónico del administrador de prueba.
ADMIN_PASSWORD: Contraseña del administrador de prueba.
EXAMPLE_COURSE_ID: ID del curso de ejemplo.
```
2. Revisión del workflow de GitHub Actions: En el repositorio, hay un archivo .github/workflows/reset-db.yml que contiene la configuración para ejecutar el script automáticamente. Aquí está la configuración básica:


```bash
name: Reset Database and Cloudinary

on:
  schedule:
    - cron: '0 * * * *'  # Cada hora
  workflow_dispatch:  # Permite la ejecución manual

jobs:
  reset-db:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18.x'

      - name: Navigate to API directory and install dependencies
        run: |
          cd api
          npm install

      - name: Run reset script
        env:
          MONGO_URI: ${{ secrets.MONGO_URI }}
          CLOUDINARY_CLOUD_NAME: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          CLOUDINARY_API_KEY: ${{ secrets.CLOUDINARY_API_KEY }}
          CLOUDINARY_API_SECRET: ${{ secrets.CLOUDINARY_API_SECRET }}
          ADMIN_ID: ${{ secrets.ADMIN_ID }}      
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
          EXAMPLE_COURSE_ID: ${{ secrets.EXAMPLE_COURSE_ID }}
        run: node scripts/resetData.js

```

Este workflow se ejecuta automáticamente cada hora o puede ser activado manualmente desde la pestaña Actions en GitHub.