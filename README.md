# MyThyroid

## Overview
MyThyroid is a mobile application designed to assist individuals with thyroid disorders by providing a platform to log and manage their blood values and symptoms. The app aims to improve users' health insights and quality of life by allowing them to easily track key health data and prepare for medical appointments.

## Key Features
- **Log Symptoms**: Track and monitor thyroid-related symptoms over time.
- **Blood Value Tracking**: Record and observe blood values for better health management.
- **User-Friendly Interface**: Simple and intuitive design for seamless navigation.
- **Secure Data Storage**: Ensure that user data is stored securely with JWT authentication and bcrypt password hashing.

## Technologies
- **Frontend**: React Native, Expo, Visual Studio Code, Axios
- **Backend**: Java 17, Spring Boot 3, Spring Security, PostgreSQL, JWT Authentication
- **Tools**: Xcode (iOS Simulator), Gradle, Trello (Project Management), Figma (Design)

## Authors
- **Nicole Silfverling**: Developer and creator of MyThyroid. Designed and developed the app from scratch, handling both frontend and backend development.


## Prerequisites
Before you can start working on the project, make sure you have the following installed:

- Java 17
- Gradle
- PostgreSQL
- Node.js
- Xcode with iOS simulator
- Expo CLI


## Getting Started


### Backend

1. Clone the repository to your local machine.
```bash
git clone https://github.com/NicoleSilfverling/thyroid-backend.git
```
2. Database Setup:
   - Install PostgreSQL if you haven't already.
   - Create a local database named "examensarbete".
   - Ensure the database is running.

3. Run project:
   - Install dependencies: `gradle build`
   - Start the backend server



### Frontend
1. Clone the repository to your local machine.
```bash
git clone https://github.com/NicoleSilfverling/thyroid-tracker.git
```
2. Expo Setup:
  - Install Expo CLI globally on your computer by running the following command:
     ```bash
     npm install -g expo-cli
     ```
         
3. Open the project with Xcode simulator:
  - Open Xcode on your computer.
  - From the Xcode menu, go to "Open Developer Tool" and choose "Simulator" to launch the iOS simulator.
  - In the iOS simulator, click on the device menu and select "iPhone 14 Pro Max" as the device to emulate.

4. Run project:
  - Start the backend
  - Install dependencies: `npm install`
  - Start the development server: `npm start`
  - Open in iOS simulator: `i`









