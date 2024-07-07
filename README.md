# Pinterest Clone

A Pinterest clone application built using Node.js, Express, MongoDB, Passport.js, and Multer.js.

## Features

- User authentication with Passport.js
- Image upload functionality with Multer.js
- Profile creation and management
- View posts in a gallery layout
- Responsive design

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Passport.js
- Multer.js
- EJS (Embedded JavaScript templates)
- CSS (Flexbox and Grid)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pinterest-clone.git
   cd pinterest-clone
   
Install dependencies:
npm install

Create a .env file in the root directory and add your MongoDB URI and session secret:
MONGODB_URI=your_mongodb_uri /n
SESSION_SECRET=your_session_secret

## Start the application:
npm i nodemon
npx nodemon
Open your browser and navigate to http://localhost:3000.

Usage
Register a new account or log in with an existing one.
Edit your profile and add a bio.
Create new posts by uploading images and adding captions.
Follow other users to see their posts in your feed.
View your own posts and the posts of users you follow.

Project Structure

pinterest-clone/
├── public/
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
├── routes/
│   ├── index.js
│   ├── users.js
│   └── posts.js
├── views/
│   ├── partials/
│   ├── error.ejs
│   ├── feed.ejs
│   ├── layout.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   └── register.ejs
├── .env
├── app.js
├── package.json
└── README.md

API Endpoints

Authentication
GET /register - Render the registration page.
POST /register - Handle user registration.
GET /login - Render the login page.
POST /login - Handle user login.
GET /logout - Log out the user.

User Profile
GET /profile - Render the profile page.
POST /profile - Update user profile information.

Posts
GET /feed - Render the feed with posts from followed users.
POST /upload - Handle image upload and create a new post.
GET /image/:id - View a single image post.


Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss what you would like to change.
