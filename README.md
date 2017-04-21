# FullStack React demo app

This simple TicTacToe game app was built with:
- React on the front-end
- Relay and GraphQL as a backend data API
- Auth0 to handle user authentication

other notable libraries required include:
- Konva for drawing canvas graphics in React
- Material-UI for providing UI components
- webpack as a module bundler

[Demo here](https://tictactoe-react.herokuapp.com)



## Installation and Deployment

1. download repo to local disk
2. navigate to dir location and install dependencies with npm or yarn: `yarn install`
3. depending on your OS, GRAPHQL variable needs to be set in package.json:
OSX ->   
```
"scripts": {
    "start": "GRAPHQL_ENDPOINT=https://api.graph.cool/relay/v1/cj1g151verr2901094koja161 node scripts/start.js",
    "build": "GRAPHQL_ENDPOINT=https://api.graph.cool/relay/v1/cj1g151verr2901094koja161 node scripts/build.js",
```
Windows ->
```
  "scripts": {
    "start": "set GRAPHQL_ENDPOINT=https://api.graph.cool/relay/v1/cj1g151verr2901094koja161&&node scripts/start.js",
    "build": "set GRAPHQL_ENDPOINT=https://api.graph.cool/relay/v1/cj1g151verr2901094koja161&&node scripts/build.js",
```
**Note: you can change this variable to you own api url as well.**
4. run dev server with `yarn start`




This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).




credit to [carl peaslee](http://www.carlpeaslee.com/) for original content