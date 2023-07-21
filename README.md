# CyberHack-FrontEnd
CyberHack project Client Side 

## Introduction

The Cyber Hack Front-End is a web application built with Angular that serves as a platform for connecting NGOs with CyberSecurity volunteers. The purpose of this application is to facilitate collaboration between NGOs and skilled volunteers who are willing to contribute their expertise in CyberSecurity-related projects.

## Features

- **NGO Registration and Posting:** NGOs can register on the platform and post their CyberSecurity-related needs and requirements.

- **Volunteer Registration and Profile Creation:** CyberSecurity experts can register as volunteers and create their profiles to showcase their skills and interests.

- **Secure Authentication:** The application uses JSON Web Tokens (JWT) for secure authentication, protecting sensitive user data, and ensuring secure access to the application.

- **Role-Based Access Control:** Auth Guards and hasRole functionality are implemented to prevent unauthorized users from accessing certain areas of the application.

- **User Management:** Users can update and delete their accounts as needed.

- **View NGOs and Volunteers:** Users can view lists of registered NGOs and Volunteers and access their profiles.

- **Contact Feature:** When clicking on the "Contact" button on a user's profile, the mail client will open, allowing users to send emails to the respective NGO or Volunteer.

## Setup and Installation

1. Clone the repository to your local machine using Git. https://github.com/BLVMF/CyberHack-FrontEnd.git


2. Navigate to the project directory.


3. Install the required dependencies.


4. Start the development server.


5. Open your web browser and go to `http://localhost:4200` to access the application.

## Authentication and Authorization

The Cyber Hack Front-End uses JWT-based authentication to secure user access. Upon successful registration and login, users receive a JWT token that is stored in the browser's local storage. The token is included in subsequent HTTP requests to authenticate the user. Auth Guards and hasRole functionality ensure that users can only access specific areas of the application based on their assigned roles (e.g., Admin, NGO, Volunteer).

## Contributing

As this project is a school project, contributions are not accepted.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For any inquiries or issues, please contact blvmf on discord.


