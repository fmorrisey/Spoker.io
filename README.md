# Project Spoker.io
Codename Spoker.io is a MERN Stack eCommerce application. Using powerful cloud noSQL MongDB and the popular React.js frontend framework to create a unique shopping experience for the cyclists. While empowering shops  of any size to increase sales and customer satisfaction. Name is subject to change later.
- M : MongoDB
- E : Express
- R : React
- N : Node

Includes:
- Redux (Partial integration for JWT)
- Mongoose
- Bootstrap
- NodeMailer
## Application Features: (as of 1/11/2020)
- Inventory Management
- User Authentication
- Orders Management
- Customer Profile
- Email Confirmation
- Mobile Responsive Design

## Setup

```
Create .env file inside the backend directory that includes:

ATLAS_URI= <MONGODB CONNECTION STRING>
JWT_PRIVATE_SECRET= <GENERATE A KEY AT LINK BELOW>
clientId= <GOOGLE OAUTH Client ID>
clientSecret= <GOOGLE OAUTH Client Secret>
refreshToken= <GOOGLE OAUTH Refresh Token>
accessToken= <GOOGLE OAUTH Access Token>

```
Generate a JWT Secret Key at [GRC.com/passwords](https://www.grc.com/passwords.htm)

## Getting Started

From the root directory, run the following commands:

For the very first build run:

- `$ docker-compose build`

Then every time after that:

- `$ docker-compose up -d`
Remove the `-d` if you want console read out and warnings

Your Node Backend server will be running at `http://localhost:5000` and your client application will be running at `http://localhost:3000`

To stop the services:

- `$ docker compose-stop`

To kill the services:

- `CTRL + C` and then `$ docker compose-down`

### Project Update:
- 01/24/2021: Docker-Compose tested and Spoker Container deployed successfully on virtual windows machine.

### Project Thank Yous / Sources:

- The Instruction Team at devCodeCamp for their wisdom and guidance: [Site Here](https://devcodecamp.com/)

- Beau Carnes for his tutorial on building an exercise tracker with MERN: [Article Here](https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1) / [GitHub](https://github.com/beaucarnes/mern-exercise-tracker-mongodb). I completed Beau's article before I attended devCodeCamp and it laid the foundation for Full-Stack development.

- Paige Nidedringhaus for her article on Passport and JWT: [Article Here](https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436) / [GitHub](https://github.com/paigen11/mysql-registration-passport).

- Rishi Prasad for his tutorial on MERN Authentication: [Article Here](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669) / [GitHub](https://github.com/rishipr/mern-auth).

- Includes many more