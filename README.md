# Scheduling App

## Overview

A web application for managing job applications and tasks using Express.js, PostgreSQL, React, Redux, and React Query.

## Features

- **Job Management**
  - View, add, edit, delete jobs
  - Update job status (applied, interviewed, etc.)
  
- **Task Management**
  - View, add, edit, delete tasks
  - Mark tasks as completed
  - Delay tasks with new time frames

- **Backend Integration**
  - Express.js server handling API endpoints
  - PostgreSQL database for storing jobs and tasks
  - RESTful API architecture for CRUD operations

- **Frontend**
  - React for dynamic UI components
  - Redux for state management of cart and order
  - React Query for efficient data fetching and caching

## Technologies Used

- **React Router DOM**: For handling routing in the application.
- **React Hook Form**: For managing form state.
- **React Query**: For data fetching, caching, synchronization, and background updating in the application.
- **React Spinners**: For loading indicators.

## Setup and Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/boatman-27/tracker-v3
   cd tracker-v3
2. **Change directory to client and scheduling-app and install dependncies**
   ```sh
   cd client/
   npm install
3. **Start the client**
   ```sh
   npm run dev
6. **Return to original directory and change to server/ and install dependncies**
   ```sh
   cd ..
   cd serevr/
   npm install
7. **Create the required tables (jobs, todos) on pgAdmin 4 or vercel(or any hosting service)**
   ```sh
   CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_title TEXT NOT NULL,
    job_desc TEXT NOT NULL,
    comp_name TEXT NOT NULL,
    comp_location TEXT NOT NULL,
    link TEXT NOT NULL,
    job_status TEXT DEFAULT 'pending',
    date_applied DATE NOT NULL
    );
   CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    task_title VARCHAR(255) NOT NULL,
    task_content TEXT NOT NULL,
    time_frame VARCHAR(50) NOT NULL,
    date_applied DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
    );
   
8. **Create a .env and store the database credentials**
   ```sh
   only uses these with pgAdmin 4
   PG_USER=your_pg_use
   PG_PASSWORD=your_pg_password
   PG_HOST=your_pg_host (localhost)
   PG_PORT=your_pg_port (5432)
   PG_DATABASE=your_pg_databasename
   only uses the link if database is hosted (like on vercel)
   POSTGRES_URL=your_postgres_connection_string
9. **Start the server**
   ```sh
   nodemon index.js
## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
