# Node-Cli

to create a new project type `node-cli`

## Folder Explanation

- [Network](./network/) This will have 2 files [response.js](./network/response.js) that its a "middleware" where you can 
standardize the way you want your API to respond [routes.js](./network/routes.js) here you can set all the routes to your components so they can be easily find
- [Components](./components/) the idea here is that every component should live in its own folder and with this template we suggest to use the following files
  - [controller](components/message/controller.js) Here you can perform all the extra transformation that the data might require either by being send as a response or by save the data as a document into the database
  - [network](components/message/network.js) create the routes for each end point o this component and it communicates with the controller to apply the business logic and store data to the data base. It also use the [response.js](./network/response.js) module to send the response to the user
  - [model](components/message/model.js) In here you can define the model that suit your component it can be a mongo model or an ORM model this is intend to be cover when the `node-cli g component` its ready
  - [store](components/message/store.js) As the controller only performs the business logic this file should be the only one that interacts with the model to save and query data by some pre-define queries

All the other files are just being use as a regular Express APP.


