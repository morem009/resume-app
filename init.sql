CREATE DATABASE IF NOT EXISTS resume_db;
USE resume_db;


CREATE TABLE IF NOT EXISTS resumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  currentJobTitle VARCHAR(255),
  currentJobDescription TEXT,
  currentJobCompany VARCHAR(255)
);

INSERT INTO resumes (firstName, lastName, currentJobTitle, currentJobDescription, currentJobCompany)
VALUES ('John', 'Doe', 'Software Engineer', 'Developing awesome software', 'ABC Inc.');
