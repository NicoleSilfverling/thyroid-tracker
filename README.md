# MyThyroid
<img width="200" alt="Logo" src="https://github.com/user-attachments/assets/8c62c69c-74cb-4f36-ab55-ded52ee333d8" />


## Overview
MyThyroid is a mobile application designed to assist individuals with thyroid disorders by providing a platform to log and manage their blood values and symptoms. The app aims to improve users health insights and quality of life by allowing them to easily track key health data and prepare for medical appointments.

## Key Features
- **Log Symptoms**: Track and monitor thyroid-related symptoms over time.
- **Blood Value Tracking**: Record and observe blood values for better health management.
- **User-Friendly Interface**: Simple and intuitive design for seamless navigation.
- **Secure Data Storage**: Ensure that user data is stored securely with JWT authentication and bcrypt password hashing.

## Technologies
- **Frontend**: React Native, Expo, Axios
- **Backend**: Java 17, Spring Boot 3, Spring Security, PostgreSQL, JWT Authentication, Gradle
- **Development Tools**: Xcode (iOS Simulator), Visual Studio Code (for frontend), IntelliJ IDEA (for backend)
- **Project Management & Design**: Trello (task management), Figma (UI/UX design)



## Authors
- **[Nicole Silfverling](https://www.github.com/NicoleSilfverling)**: Developer and creator of MyThyroid. Designed and developed the app from scratch, handling both frontend and backend development.

## Demo
### Log in and sign up
<img src="https://github.com/user-attachments/assets/cf41cf39-a9ae-454e-841e-6d3c63cb9b4c" alt="log in" width="200">
<img src="https://github.com/user-attachments/assets/fa1572a9-697e-434c-a956-d081280885c6" alt="log in with validation error" width="200">


<img src="https://github.com/user-attachments/assets/0ee1943c-bf21-4add-bea1-b60e49f7202d" alt="sign up" width="200">
<img src="https://github.com/user-attachments/assets/136d64dd-d12c-4851-88da-a4b63ee6c64c" alt="sign up with validation error" width="200">


### Track symptoms

<img src="https://github.com/user-attachments/assets/e820dbe0-5161-4c03-b0d1-0a2500e5cf37" alt="Track symptoms" width="200">

<img src="https://github.com/user-attachments/assets/88da846c-067c-4e84-9a5b-c67ee71dd932" alt="Track symptoms" width="200">

<img src="https://github.com/user-attachments/assets/402b222b-5d06-4180-a008-31dd5a558c9e" alt="Track symptoms" width="200">

<img src="https://github.com/user-attachments/assets/6aacf5d5-9b6c-4a6e-8a10-96a58c2246ea" alt="Track symptoms" width="200">

<img src="https://github.com/user-attachments/assets/270799f3-68ad-49d8-ac59-aac6cd0d1a37" alt="Track symptoms" width="200">




## Setup
### Prerequisites
Before you can start working on the project, make sure you have the following installed:

- Java 17
- Gradle
- PostgreSQL
- Node.js
- Xcode with iOS simulator
- Expo CLI


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










