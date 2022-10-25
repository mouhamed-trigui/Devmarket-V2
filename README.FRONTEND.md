## Generate an application

Run `nx g @nrwl/react:app my-app --js` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib --js` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nx-defmarket/mylib`.

## Development server

Run `nx serve defmarket-backoffice` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --directory=directory-path --js --project=my-app ` to generate a new component.
Example `nx g @nrwl/react:component avatar --directory=components/atoms --js --project=defmarket-backoffice`

## Storybook

Run `nx run defmarket-backoffice:storybook`

## Internationalization

Run `nx run defmarket-backoffice:translate`

## Capacitor

# Capacitor - Add Native Platform

Run `nx run defmarket-backoffice:add:ios`
Run `nx run defmarket-backoffice:add:android`
or Run `nx run defmarket-backoffice:add --platform {native platform}`

# Capacitor - Copy Build Output

Run `nx run defmarket-backoffice:copy:ios`
Run `nx run defmarket-backoffice:copy:android`
or Run `nx run defmarket-backoffice:copy --platform {native platform}`

# Capacitor - Sync Build Output and Dependencies

Run `nx run defmarket-backoffice:sync:ios`
Run `nx run defmarket-backoffice:sync:android`
or Run `nx run defmarket-backoffice:sync --platform {native platform}`

# Capacitor - Open Native Platform

Run `nx run defmarket-backoffice:open:ios`
Run `nx run defmarket-backoffice:open:android`
or Run `nx run defmarket-backoffice:open --platform {native platform}`

## Build

Run `nx build defmarket-backoffice` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test defmarket-backoffice` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e defmarket-backoffice` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
