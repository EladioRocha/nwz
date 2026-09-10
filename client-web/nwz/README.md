# NWZ Web Client

Angular 9 web interface for the NWZ book application.

See the [repository guide](../../README.md) for API, database, and storage configuration.

## Local preview

Run these commands from this directory:

```sh
npm ci
npm run ng -- serve
```

Open `http://localhost:4200`. Confirm the API and socket destinations in `src` point to your development backend.

## Build and checks

- `npm run build`: compile the Angular application.
- `npm test`: run the Karma test runner.
- `npm run lint`: run the configured linter.
- `npm run e2e`: run the Protractor workflow.

The package declares Node `~12.16.1` and npm `~6.13.4`. Installation runs `ng build --aot --prod`. `npm start` serves compiled files from `dist/nwz` through `server.js` on `PORT` or 8080; it is not the development watcher.

These are legacy component commands. No dependency upgrade or client integration test is included in this documentation change.
