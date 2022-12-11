# Markdown CloudNotes

Deployed: https://cloudmarkdownnotes.herokuapp.com/ (Heroku has changed it free plan to paid, App not working anymore :-()

This is a full stack Single Page Application created using

- `React v18`
- `Node.js v16`
- `Express.js v4.18`
- `MongoDB`

# Getting Started with this project

## Available Scripts

In the project root directory, you can run:

`npm start` - to run bacnkend server

`npm run server` - to run backend in nodemon environment, which will autorestart the server in case of any changes in files.

`npm run client` - to compile and run React SPA.

```
"start": "node backend/server",
"server": "nodemon backend/server",
"client": "npm start --prefix frontend",
```

### Please set a .env file in root folder for execution of above commands successfully.

`.env`

```
PORT = 5000
MONGO_URI=<mongoURI>
NODE_ENV=<production/dev>
JWT_SECRET=<write_any_secret>
```

example

```
PORT = 5000
MONGO_URI=mongodb+srv://root:testtesttesttest@cluster0.ghliv.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=helloworld
```

# Deploying to heroku

Deploy using Heroku Git
Use git in the command line or a GUI tool to deploy this app.
Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

Clone the repository
Use Git to clone cloudmarkdownnotes's source code to your local machine.
Here `cloudmarkdownnotes` is the project name on heroku.

```
$ heroku git:clone -a cloudmarkdownnotes
$ cd cloudmarkdownnotes
```

Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

# React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
