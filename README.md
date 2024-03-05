# Real-Time Chat Application with MERN Stack

This is a real-time chat application that allows users to connect with each other and chat in real-time. It is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Socket.io, Zustand, Tailwind CSS and Daisy UI.

## Live Site URL

[MERNChat](https://mern-chat-app-2n65.onrender.com)

## Screenshots

![SignUp-screenshot](/screenshots/3.png)
![Chat-screenshot-1](/screenshots/1.png)
![Chat-screenshot-2](/screenshots/2.png)

## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, and Node.js)
- Socket.io
- Zustand
- Tailwind CSS
- Daisy UI

## Features

- Real-time chat: users can send and receive messages in real-time
- User authentication: users can sign up, log in, and log out
- Online user status (Socket.io and React Context)
- Global state management with Zustand
- Notifications: users can receive sound notifications on new messages
- Search user functionality
- Error handling both on server side and client side

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the frontend on one terminal and the backend on the other terminal)

In the first terminal

```
$ cd frontend
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```

In the root directory

- create a .env file
- Supply the following credentials

```
PORT=3000
MONGO_URL=<you Mongo Url>
JWT_SECRET=<your JWT secret>
JWT_LIFETIME=<your JWT lifetime value>
NODE_ENV=development
```

In the second terminal

```
$ cd backend
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```
