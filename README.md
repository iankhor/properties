![Build and Deploy](https://github.com/iankhor/properties/workflows/Build%20and%20Deploy/badge.svg?branch=master)
![Coverage](https://codecov.io/github/iankhor/properties/branch/master/graph/badge.svg)

# ;TLDR

A app to filter down a list of properties

Deployed app is at [https://ap-properties.herokuapp.com/](https://ap-properties.herokuapp.com/)

---

Animated demo below

![](/docs/demo.gif)

Mockup

![](/docs/mockup.png)

---

Notable Tech/Tools used:

1. [Typescript](https://www.typescriptlang.org/)
2. [React](http://www.reactjs.org)
3. [Jest](https://jestjs.io/docs/en/tutorial-react)
4. [React Testing Library](https://testing-library.com/docs/react-testing-library)
5. [Webpack](https://webpack.js.org/)
6. [React Axe - for accessibility testing](https://github.com/dequelabs/react-axe)
7. [CSS Modules](https://github.com/css-modules/css-modules)
8. [CSS Grid - for responsive webpages](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## Instructions

To run on a your local machine

1. Clone this repo
2. run `mv .env.example .env`
3. populate the environment variables in `.env`. Contact me to obtain the environment variable for REACT_APP_PROPERTIES_ENDPOINT.
4. run `yarn start`
5. On a browser, go to `localhost:8080`

To run test

1. run `yarn test:dev`
