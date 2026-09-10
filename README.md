# nwz

Proyecto de sistemas distribuidos con servidor Node.js y clientes Angular para web y Android/Cordova. Cada componente tiene sus propias dependencias.

## Estructura

- [client-android](client-android)
- [client-web](client-web)
- [server](server)

## Preparación y uso

Instala las dependencias por componente. `client-web/nwz/` declara Node `~12.16.1` y npm `~6.13.4`: es un entorno heredado que necesita migración antes de reutilizarse en un despliegue actual. El servidor usa MongoDB y configuración de almacenamiento y autenticación. Revisa las URL de los clientes antes de conectarlos.

### client-android

Requiere Node.js. Este paquete no fija una versión del runtime; valida compatibilidad con las dependencias antes de actualizarlo.

```sh
cd client-android
npm ci
npm run start
```

Comandos declarados en [client-android/package.json](client-android/package.json):

| Comando | Acción |
| --- | --- |
| `npm run ng` | `ng` |
| `npm run start` | `ng serve` |
| `npm run build` | `ng build` |
| `npm run test` | `ng test` |
| `npm run lint` | `ng lint` |
| `npm run e2e` | `ng e2e` |

### client-web/nwz

Versiones declaradas: `node ~12.16.1`, `npm ~6.13.4`.

```sh
cd client-web/nwz
npm ci
npm run start
```

Comandos declarados en [client-web/nwz/package.json](client-web/nwz/package.json):

| Comando | Acción |
| --- | --- |
| `npm run ng` | `ng` |
| `npm run start` | `node server.js` |
| `npm run build` | `ng build` |
| `npm run test` | `ng test` |
| `npm run lint` | `ng lint` |
| `npm run e2e` | `ng e2e` |
| `npm run postinstall` | `ng build --aot --prod` |

### server

Requiere Node.js. Este paquete no fija una versión del runtime; valida compatibilidad con las dependencias antes de actualizarlo.

```sh
cd server
npm ci
npm run dev
```

Comandos declarados en [server/package.json](server/package.json):

| Comando | Acción |
| --- | --- |
| `npm run dev` | `nodemon src/index.js` |
| `npm run start` | `node src/index.js` |

## Configuración detectada en el código

Estas son referencias explícitas a variables de entorno, no una garantía de que toda la configuración esté externalizada. Los nombres y archivos permiten localizar dónde se usan; los valores deben corresponder a tu entorno.

| Variable | Referencia |
| --- | --- |
| `ACCESS_KEY_ID` | [server/src/helpers/uploadFileToAWS.js](server/src/helpers/uploadFileToAWS.js) |
| `API_URL_USER_PICTURES_BASE` | [server/src/services/authentication/controllers.js](server/src/services/authentication/controllers.js) |
| `BCRYPT_SALT_ROUNDS` | [server/src/services/authentication/middlewares.js](server/src/services/authentication/middlewares.js) |
| `BOOKS_PER_PAGE` | [server/src/services/books/controllers.js](server/src/services/books/controllers.js) |
| `BUCKET_NAME` | [server/src/services/books/controllers.js](server/src/services/books/controllers.js) |
| `DEFAULT_STATUS_REPORT` | [server/src/services/users/controllers.js](server/src/services/users/controllers.js) |
| `HOME` | [client-android/platforms/android/cordova/lib/build.js](client-android/platforms/android/cordova/lib/build.js) |
| `JWT_SECRET_KEY` | [server/src/services/authentication/middlewares.js](server/src/services/authentication/middlewares.js) |
| `MONGO_URI_PROD` | [server/src/index.js](server/src/index.js) |
| `PORT` | [client-android/server.js](client-android/server.js) |
| `PORT_DEV` | [server/src/index.js](server/src/index.js) |
| `SECRET_ACCESS_KEY` | [server/src/helpers/uploadFileToAWS.js](server/src/helpers/uploadFileToAWS.js) |
| `STATUS_OK` | [server/src/helpers/handleResponse.js](server/src/helpers/handleResponse.js) |

No guardes credenciales reales en la documentación. Si hay `.env.example`, úsalo como referencia y revisa cómo carga la configuración el punto de entrada.

## Validación y estado

Esta guía se contrastó con el árbol de archivos y los manifiestos del repositorio. No se ha validado una ejecución completa contra servicios externos, bases de datos o hardware. Las versiones y los scripts mostrados describen el código actual; no implican que sus dependencias antiguas sigan siendo compatibles.
