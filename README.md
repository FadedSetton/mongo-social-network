#  Social Network API

This is a full-featured backend API for a social networking application. It uses **Express.js**, **MongoDB**, and **Mongoose** to allow users to create accounts, share their thoughts, react to friends' thoughts, and build a list of friends.

---

##  Table of Contents

- [Features](#features)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

---

## Features

- Create, update, delete **users**
- Create, update, delete **thoughts**
- Add and remove **reactions** to thoughts
- Add and remove **friends** to user friend lists
- Mongoose virtuals for `friendCount` and `reactionCount`
- JSON responses for all endpoints

---


##  Usage

This API is tested using **Insomnia** or **Postman**. Use the endpoints below to interact with the database.

---

##  API Routes

### Users

- `GET /api/users` → Get all users  
- `GET /api/users/:id` → Get one user  
- `POST /api/users` → Create a user  
- `PUT /api/users/:id` → Update a user  
- `DELETE /api/users/:id` → Delete a user

### Friends

- `POST /api/users/:userId/friends/:friendId` → Add a friend  
- `DELETE /api/users/:userId/friends/:friendId` → Remove a friend

### Thoughts

- `GET /api/thoughts` → Get all thoughts  
- `GET /api/thoughts/:id` → Get one thought  
- `POST /api/thoughts` → Create a thought  
- `PUT /api/thoughts/:id` → Update a thought  
- `DELETE /api/thoughts/:id` → Delete a thought

### Reactions

- `POST /api/thoughts/:thoughtId/reactions` → Add a reaction  
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` → Remove a reaction

---

##  Walkthrough Video

 [Click here to view the walkthrough video](https://app.screencastify.com/v3/watch/swIp1Mnw6h69r9LmX5EG)  


---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
