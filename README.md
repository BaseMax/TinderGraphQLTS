# Tinder Clone - GraphQL Back-end

This project is a GraphQL-based back-end for a Tinder clone application. It provides the necessary API for managing user accounts, profiles, matching, and messaging functionalities similar to the popular dating app Tinder.

## Features

The Tinder clone back-end offers the following features:

- User Management
  - User registration
  - User login
  - User authentication and authorization
- Profiles
  - Create and update user profiles
  - Fetch user profiles
  - Search and filter profiles based on various criteria (e.g., age, location, interests)
- Matching
  - Algorithm for matching users based on their preferences and interests
  - Accept or reject potential matches
  - Retrieve matched user profiles
- Messaging
  - Send and receive messages between matched users
  - Real-time messaging functionality
  - Notifications for new messages

## Technologies Used

The Tinder clone back-end is built using the following technologies:

- **GraphQL:** A query language for APIs, used for defining the API schema and executing queries/mutations.
- **Node.js:** A JavaScript runtime environment used for building scalable server-side applications.
- **Express.js:** A web application framework for Node.js, used for building the GraphQL server.
- **MongoDB:** A NoSQL database used for storing user data, profiles, and messages.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB, used for modeling and interacting with the database.
- **Apollo Server:** A GraphQL server library for Node.js, used for handling GraphQL requests and responses.

## Setup and Installation

To set up and run the Tinder clone back-end locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/BaseMax/TinderGraphQLTS.git
```

Install dependencies:

```bash
cd TinderGraphQLTS
npm install
```

Configure environment variables:

- Rename the .env.example file to .env.
- Update the .env file with your own configuration, such as the database connection string and secret keys.
- Run the application:

```bash
npm start
```

This will start the GraphQL server on http://localhost:4000/graphql.

You can now send GraphQL queries and mutations to the server using a tool like GraphQL Playground or Insomnia. Open the respective tool and access http://localhost:4000/graphql to begin interacting with the API.

## Documentation

For detailed documentation on the available queries, mutations, and data structures, refer to the API documentation.

## Contributing

Contributions are welcome! If you find any issues or would like to suggest enhancements, please open an issue or submit a pull request.

## License

The Tinder clone back-end is open-source and released under the GPL-3.0 License.

## Acknowledgements

This project is inspired by Tinder and aims to replicate some of its functionality. It is not affiliated with or endorsed by Tinder.

Copyright 2023, Max Base
