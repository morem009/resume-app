# Resume App

Welcome to the Resume App! This application allows you to manage and retrieve resume details through a user-friendly interface.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (if using Docker for MySQL)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/morem009/resume-app.git
cd resume-app
```

### 2. Install Dependencies
cd frontend
npm install

cd ../backend
npm install

### 3.Configure Database Connection
Open backend/server.js and update the MySQL database connection details.
const db = mysql.createConnection({
  host: 'resume-mysql',  // Docker container name or 'localhost' for local machine
  user: 'root',
  password: 'root',
  database: 'resume_db',
});

### 4.Build and Run Docker Container (Optional)
