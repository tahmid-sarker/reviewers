# Reviewers (Review Management)

- [**View Live**](https://tahmid-sarker.github.io/reviewers/)

Reviewers is a review management web application that lets users explore, share, and review digital services. Whether you're offering solutions or looking for honest feedback, Reviewers brings user-powered service discovery to life.

> [!TIP]
> **Test User Credentials**  
> **Email**: `tahmid@engineer.com`  
> **Password**: `Abc@123456`

## Features

* **Authentication** – Firebase-based user login, registration, and password reset
* **Add & Manage Services** – Users can post, update, or delete their own services
* **Review System** – Add, edit, or delete reviews for listed services
* **User Dashboard** – Profile page to view and update personal info
* **Membership Page** – Learn about premium benefits
* **Dark Mode Support** – Toggle between light and dark themes
* **JWT-Protected Backend** – Firebase-issued tokens used to protect routes
* **Responsive Design** – Fully mobile-friendly with Tailwind CSS

## Tech Stack

| Category        | Tools                      |
| --------------- | -------------------------- |
| Frontend        | React, Tailwind CSS        |
| Backend         | Express.js, MongoDB        |
| Auth & Hosting  | Firebase (Auth + Hosting)  |
| Auth Protection | Firebase Admin, JWT        |
| Deployment      | GitHub Pages (client) + Vercel (API) |


## Routing Overview

| Route                  | Description                                 |
| ---------------------- | ------------------------------------------- |
| `/`                    | Home page                                   |
| `/membership`          | Membership info and features                |
| `/login`               | Login page                                  |
| `/register`            | Registration page                           |
| `/forget-password`     | Reset password                              |
| `/my-profile`          | View your profile *(protected)*             |
| `/update-profile`      | Update your profile *(protected)*           |
| `/services`            | Browse all services                         |
| `/add-service`         | Add new service *(protected)*               |
| `/service-details/:id` | View service & reviews *(protected)*        |
| `/my-services`         | Manage your posted services *(protected)*   |
| `/update-service/:id`  | Edit your own service *(protected)*         |
| `/my-reviews`          | Manage your submitted reviews *(protected)* |
| `/*`                   | 404 Not Found page                          |

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tahmid-sarker/reviewers.git
   cd reviewers
   ```

2. **Install root, client, and server dependencies**

   ```bash
   npm install
   npm run install:all
   ```

3. **Setup Environment Variables**

   Copy `client/.env.example` to `client/.env.local` and `server/.env.example` to `server/.env.local`, then fill in your values.

4. **Start client and server together** (from the project root)

   ```bash
   npm run dev
   ```

   This runs the Express API and the Vite client at the same time. To run them separately: `npm run dev:server` or `npm run dev:client`.

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
client/
└── src/
    ├── assets/
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   └── MainLayout.jsx
    │   └── shared/
    │       ├── DarkModeToggler.jsx
    │       └── DynamicTitle.jsx
    ├── config/
    │   └── firebase.config.js
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── AuthProvider.jsx
    │   ├── ThemeContext.jsx
    │   └── ThemeProvider.jsx
    ├── hooks/
    │   └── useAuth.jsx
    ├── pages/
    │   ├── Auth/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── ForgetPassword.jsx
    │   ├── Services/
    │   │   ├── Services.jsx
    │   │   ├── AddService.jsx
    │   │   ├── ServiceDetails.jsx
    │   │   ├── MyServices.jsx
    │   │   └── UpdateService.jsx
    │   ├── Profile/
    │   │   ├── MyProfile.jsx
    │   │   └── UpdateProfile.jsx
    │   ├── MyReviews.jsx
    │   ├── Membership.jsx
    │   ├── Home.jsx
    │   └── Error.jsx
    ├── routes/
    │   ├── Router.jsx
    │   └── PrivateRoutes.jsx
    ├── main.jsx
    ├── index.css
    └── index.html

server/
└── index.js
```

## Credits

This project was developed by [Tahmid Sarker](https://tahmid-sarker.github.io).