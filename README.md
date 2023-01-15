# Cataloger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Installation

This project has been developed using `npm` as a package manager. I should work with other package managers (such as yarn or pnpm...). Run `npm install` or similar to prepare you project to be run.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running in any environment

A `Dockerfile` file has been added to prepare get the project ready to be run in any environment.

```bash
$ docker build -t cataloger .
$ docker run --name cataloger -p 80:80 cataloger
```

Navigate to `http://localhost/`.

A `docker-compose.yml` can make the task even easier:

```bash
$ docker-compose up
```

NB. In order to run this project along with the BE side, please refer to `cataloger_backend`.
