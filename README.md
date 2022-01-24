# The freelancer interview project

This git repository contains the starting code for our interview projet.

## Objective

The objective of this project is to have a _tiny_ freelancer profile application.
It displays the profile of the current freelancer and allow him to edit it.

**Your goal** is to develop the **profile and edition pages** by updating the app and the api.
Feel free to use any additional libraries you think is needed.

## Project layout

- The app was bootstrapped with [create-react-app](https://create-react-app.dev/).
- The api is a simple GraphQL server, with the minimum to have it running.

Have a look in the code to see the missing pieces.

## Getting started

Fork the repository and in root folder, run the commands:

```sh
npm i
npm run up
```

`npm run up` will start up several background process with [pm2](https://pm2.io/) that are required for development.

If you want to know if everything is running like it should, `npm run list` will list all processes and `npm run log [process-name]` will display to the console the output of a process.

Having some trouble with the codegen? Run `npm run codegen` and look for errors.

Wanna stop everything? `npm run down` is here for you.

## Submitting your code

Push on your forked repository and send us the link to it.  
**⚠️ Make sure it is public so we can access it!**
