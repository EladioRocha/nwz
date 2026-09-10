# NWZ — Distributed Book Application

A distributed-systems coursework project with a **Node.js API, an Angular web client, and an Angular/Cordova Android client**. The API includes books, authentication, users, genres, formats, languages, and locations.

## Components

| Directory | Purpose |
| --- | --- |
| [server](server) | Express API, MongoDB data, Socket.IO, and storage helpers. |
| [client-web/nwz](client-web/nwz) | Angular web application and an Express static server. |
| [client-android](client-android) | Angular client with Cordova Android configuration. |

Install dependencies separately in each component. The root Cordova package is not the entry point for the full application.

## Runtime and configuration

The web package declares Node `~12.16.1` and npm `~6.13.4`; the clients use Angular 9-era tooling. These are historical requirements, not a recommendation for a new deployment. Native PDF/image packages and Android tooling may need compatibility work.

Create local server configuration in `server/.env` before startup:

| Variables | Purpose |
| --- | --- |
| `MONGO_URI_PROD` | MongoDB URI consumed by the entry point, including for a local database. |
| `PORT_DEV`, `PORT` | API port; `PORT` takes precedence. |
| `JWT_SECRET_KEY`, `BCRYPT_SALT_ROUNDS` | Authentication secret and password work factor. |
| `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `BUCKET_NAME` | Storage credentials and bucket used by upload helpers. |
| `API_URL_USER_PICTURES_BASE` | User-picture base URL. |
| `BOOKS_PER_PAGE` | Book pagination setting. |
| `DEFAULT_STATUS_REPORT`, `STATUS_OK` | Application status values used by server helpers. |

Review the consuming code under [server/src](server/src) for the expected status values and storage setup. Check API and socket URLs in both clients before connecting to a local server; configuration is not centralized entirely in Angular environment files.

## Start the API

```sh
cd server
npm ci
npm start
```

Routes are mounted under `/api/v1/`, including `/api/v1/books` and `/api/v1/authentication`. `npm run dev` refers to `nodemon`, which is not declared in this package.

## Start a client

From `client-web/nwz`, run `npm ci`, then `npm run ng -- serve` for the Angular development server on port 4200. Installation triggers a production build through `postinstall`. `npm start` instead serves the compiled `dist/nwz` application on `PORT` or port 8080.

From `client-android`, run `npm ci` and `npm start` for a browser preview. This does not build or install an Android app. See the component guides for more detail:

- [Web client guide](client-web/nwz/README.md)
- [Android client guide](client-android/README.md)

## Verification

The clients declare build, Karma test, lint, and Protractor e2e scripts. Their presence does not establish passing coverage. The API has no test script. MongoDB, storage, live sockets, and Android packaging were not exercised during this documentation update. Preserve the notices in bundled Cordova code when modifying the project.
