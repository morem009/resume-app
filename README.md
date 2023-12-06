# Resume App

Welcome to the Resume App! This application allows you to manage and retrieve resume details through a user-friendly interface.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (if using Docker for MySQL)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone -b master --single-branch https://github.com/morem009/resume-app.git
cd resume-app
```

### 2. Install Dependencies
```bash
npm install
```
```bash
cd resume-frontend
npm install
```

### 3.Configure Database Connection
Open backend/server.js and update the MySQL database connection details.
```bash
const db = mysql.createConnection({
host: 'resume-mysql',  // Docker container name or 'localhost' for local machine
user: 'root',
password: 'root',
database: 'resume_db',
});
```

### 4.Build and Run Docker Container (Optional)
```bash
docker run -d --name resume-mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:latest
```

### 5. Populate the Database
Run the application to add sample resumes to the database:
```bash
node database.js
```

### 6. Run the Application
Start the frontend and backend:

```bash
npm start
```
Frontend
```bash
cd frontend
npm start

```
### Usage
Retrieve resume details by ID or name.
Add new resumes.

### Issues
If you encounter any issues or have suggestions, please open an issue.
