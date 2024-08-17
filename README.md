Grievance Website
by: Sreejith Sali


This is a grievance submission and management web application. Users can register, log in, and submit grievances, while admins can log in to view and manage grievances. The project uses Node.js, Express, MongoDB Atlas, and EJS for templating.

Features
•	User registration and login
•	Grievance submission (accessible after user login)
•	Admin login with access to the admin dashboard
•	Admin dashboard displaying user grievances with user details
•	Email notifications for new user registrations and grievance submissions

Technologies Used
•	Frontend: HTML, CSS, JavaScript, EJS
•	Backend: Node.js, Express
•	Database: MongoDB Atlas
•	Authentication: JSON Web Tokens (JWT), bcrypt
•	Email Notifications: nodemailer

Dependencies
The project relies on the following key dependencies:
•	Express: Web framework for Node.js.
•	Mongoose: MongoDB object modeling tool.
•	bcrypt: Library for hashing passwords.
•	jsonwebtoken: JSON web token implementation.
•	nodemailer: Library for sending emails.



Prerequisites

Before running this project, ensure you have the following installed:
•	Node.js: Make sure you have Node.js installed on your system.
•	npm: Node.js package manager, which comes with Node.js

Setup Instructions
•	Extract the Zip File

Download the .zip file and extract it to your desired location.

•	Install Dependencies
     Open a terminal (vscode)or command prompt in the extracted folder.

     Run the following command to install the required dependencies:

	‘npm install’

This command will read the ‘package.json’ file and install all the necessary dependencies listed there.


•	Connecting to MongoDB Atlas

The MongoDB Atlas cluster for this project is configured to allow connections from any IP address (0.0.0.0/0). This means that you can run this project from any machine using the provided MONGODB_URI and credentials. If needed, you can replace it with your own URI by updating the MONGODB_URI value in the server.js file.

•	Configuration

This project does not use a ‘.env file’. Instead, it uses a ‘config.js’ file to manage configuration.









You should replace the placeholder values with your credentials if you want to change the Nodemailer email or the admin email. Currently, my email is used in the configuration.

•	Running the Project

Automatically Open Browser:

To automatically open “http://localhost:5000” in your default web browser when the server starts, the open module is used. Ensure that you have this module installed. The server will handle opening the browser automatically upon startup. you can add it with:

“npm install open”

After configuring the project, you can start the server with:

‘npm start’

This will start the application on http://localhost:5000.


•	Admin Login

The admin login credentials are hardcoded for testing purposes. To log in as an admin, use the following credentials:

Name: ‘appu’
Password: ‘appu123’

Note: These credentials are hardcoded in the application for simplicity and should be updated or replaced with a more secure method for production environments.
Contact

If you have any questions or need further assistance, feel free to contact:

•	Name: Sreejith Sali
•	Email: sreejithsali93@gmail.com
•	Phone: 6238509535

