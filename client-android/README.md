# NWZ Android Client

Angular 9 interface with a Cordova Android wrapper for the NWZ book application.

See the [repository guide](../README.md) for API, database, and storage configuration.

## Local preview

Run these commands from this directory:

```sh
npm ci
npm start
```

Open `http://localhost:4200`. Confirm the API and socket destinations in `src` point to your development backend.

## Build and checks

- `npm run build`: compile the Angular application.
- `npm test`: run the Karma test runner.
- `npm run lint`: run the configured linter.
- `npm run e2e`: run the Protractor workflow.

The checked-in `config.xml`, `platforms`, and `plugins` describe a legacy Cordova Android setup. A browser preview does not validate native permissions or packaging. Android builds require a compatible JDK, Android SDK, Gradle, and Cordova toolchain; no native build was verified for this update.

These are legacy component commands. No dependency upgrade or client integration test is included in this documentation change.
