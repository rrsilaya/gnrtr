<p align="right">
  <a href="https://github.com/rrsilaya/gnrtr">
    <img src="https://img.shields.io/badge/project-gnrtr-blue.svg?style=for-the-badge" alt="gnrtr">
  </a>
</p>

<h1 align="center">
  react-app
  <br/>
  <img src="https://img.shields.io/badge/status-development-yellow.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/node-v8.3.0-green.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/react-v^16.2.0-green.svg?style=flat-square" />
  <br/>
</h1>

### Installation
1. Install all the dependencies with `yarn install`.
2. Start the development server using `yarn start`.

### Included Packages
* ReactJS*
* Redux (React-Redux)
  - Redux Logger
  - Redux Thunk
  - Redux Pack
* Axios
* Prettier

> \* standard ReactJS setup with Babel, Webpack, and loaders.

### Project Structure
```
.
├── config/                             # webpack and miscellaneous configurations
├── public/
├── scripts/
├── src/
│   ├── api/                            # files for API calls
│   │   └── index.js
│   ├── app/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── router.js                   # routes JSON
│   │   └── store.js                    # redux store
│   ├── features/
│   │   ├── feature1/
│   │   │   ├── duck.js                 # feature duck
│   │   │   ├── Feature1.js
│   │   │   └── style.css               # feature-specific style
│   │   └── index.js                    # root reducer
│   ├── stylesheets/                    # global stylesheets (CSS or SASS)
│   ├── index.css
│   ├── index.js
│   └── registerServiceWorker.js
├── package.json
├── README.md
└── yarn.lock
```

This project is generated using [gnrtr](https://github.com/rrsilaya/gnrtr).