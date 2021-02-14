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
- 01/11/2021: Project MVP version 1.0
- 01/24/2021: Docker-Compose tested and Spoker Container deployed successfully on virtual windows machine.
