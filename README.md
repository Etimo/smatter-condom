# Smatter 🚀

## What is Smatter?

Smatter is a Twitter-like social media page. We use it as a code base for applicants to complete tasks as part of the interview process.

## Tech Stack

Theres a frontend package and a backend package. The frontend is built with React with Vite, and the backend is a web API built with Node.js and Express. The backend uses a MongoDB database.

## Development Setup

1. **Install Dependencies**\
   Run the following command in the project root, and in each package

   ```bash
   npm install
   ```

2. **Start the Database**\
   Run the following command in the backend package to start your database in a Docker container:

   ```bash
   npm run start-db
   ```

3. **Start the App**\
   Run the following command in the project root to start both the backend and frontend:

   ```bash
   npm run dev
   ```

   The frontend is served on port 5173, and the API can be accessed on port 3001.

## Tasks

**Let users set their own display names when registering**

Currently, the username value is passed as the display name for each user. Update the registration form to include a field for the user's display name, and pass that value to the signup request.

Hint: start in the `register.tsx` file.
