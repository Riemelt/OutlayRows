# OutlayRows

## [Demo](https://outlay-rows-blush.vercel.app/)

To make demo work, please go to the site settings and allow insecure content, otherwise outlay rows API will be unavailable

## Compatible with

- node v18.17.1
- npm 9.8.1

## Stack

- typescript
- react
- react-redux
- scss
- css modules
- material ui
- webpack

## Install

```sh
git clone https://github.com/Riemelt/OutlayRows.git
cd OutlayRows
npm i
```

## Environment

You should create an entity in order to setup environment variables ([API](http://185.244.172.108:8081/swagger-ui/index.html?url=/openapi.json#/outlay-string-controller/createEntityUsingPOST))
After that, create `.env.local` file in the root of the project and setup the following variables there

```sh
API_ENTITY_ID=424242
API_URL=http://185.244.172.108:8081/v1
```

## Commands

Run on dev-server

```sh
npm run start
```

Build in development mode

```sh
npm run dev
```

Build in production mode. Bundle will be placed in `dist` folder

```sh
npm run build
```

Run eslint

```sh
npm run lint
```

Run stylelint

```sh
npm run stylelint
```
