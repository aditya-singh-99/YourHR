# YourHR

This is a simple Node.js application that allows users to sign up and upload their resumes. The backend is built using Express, MongoDB, and Multer for file handling.

## Features

- **User Signup:** Register a new user with a username and password.
- **Resume Upload:** Users can upload a PDF resume after signing up.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v12.x or later)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **Git** (optional for cloning the repository)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/aditya-singh-99/YourHR.git
    cd YourHR
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Environment Variables**:

    - Rename `.env.sample` to `.env`.
    - Add your MongoDB URI to the `.env` file:

## Running the Application Locally

1. **Start MongoDB**: If you're using a local MongoDB instance, make sure it's running.

2. **Run the server**:

    ```bash
    npm start
    ```

    The server should start and listen on the default port `3000` unless otherwise configured in .env.

3. **Test the API**:

    You can use tools like **Postman** or **cURL** to test the API endpoints.

    - **Sign Up**:
    
        ```bash
        POST /user
        ```

        Send a JSON object with `username` and `password`.

    - **Upload Resume**:

        ```bash
        POST /resume?id=<user_id>
        ```

        Upload a PDF file using the `multipart/form-data` format.

    - **Get User Information**:

        ```bash
        GET /user?id=<user_id>
        ```

        Retrieves user data including a message indicating if a resume is available.

    - **Get Resume**:

        ```bash
        GET /resume?id=<user_id>
        ```

        Retrieves the PDF resume file of the specified user.

## API Endpoints

- **POST** `/user`: Register a new user.
- **POST** `/resume?id=<user_id>`: Upload a resume for the specified user.
- **GET** `/user?id=<user_id>`: Fetch the user's information.
- **GET** `/resume?id=<user_id>`: Fetch the user's uploaded resume.

## Environment Variables

This project requires the following environment variables:

- **MongoDB_URI**: The MongoDB connection string.

## Directory Structure

```plaintext
YourHR/
│
├── .env.sample             # Sample environment variables file
├── package.json            # Project metadata and dependencies
├── public/                 # Static frontend files
├── index.js                # Main server file
├── db/                     # Database Connection
├── routes/                 # API route handlers
├── controllers/            # API route controllers
├── models/                 # Mongoose models
└── README.md               # This file
