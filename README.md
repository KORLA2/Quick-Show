# Project Overview
Quick Show is a full-stack movie ticket booking platform where users can browse movies and book seats, and theater admins can manage theaters and shows.
The application supports role-based access for Admins and Users with secure authentication.

## Live Link

User: https://quick-show-hije.vercel.app/

Admin: https://quick-show-hije.vercel.app/admin

## Tech Stack
```
Frontend: React, TypeScript, Tailwind CSS

Backend: Node.js, Express, TypeScript

Database: PostgreSQL

Deployment: Vercel (Frontend), Render (Backend) , Neon (Database)
```

## User
```
Browse trending and popular movies
View available theaters by selected movie and date
Select show timings and specific seats
Book tickets with seat locking to prevent double booking

```
## Admin
```
Admin dashboard available at /admin
Admin can register their theater and add movies to their theater with show date, timings and ticket price.
View bookings and manage shows.

```


## Authentication 
```
User and Admin signUp/Login is handled using JWT tokens.  
HTTP-only cookies are used to secure authentication and protect admin/user  routes.

```



