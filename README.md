# Movies SPA Application – Assignment 2

## Student Information

- **Student Name:** Albert Francis Emmatty
- **Module:** Enterprise Web Development
- **Assignment:** Assignment 2 – Designing and Developing an SPA
- **Submission Date:** 17/05/2026

---

# Project Overview

This project is a Single Page Application (SPA) developed using React. The application extends the Movies App developed during the lab sessions and integrates additional functionality using APIs developed in Assignment 1.

The application allows users to browse movie-related data, search and filter movies, manage favourites, and interact with additional movie entities such as actors and TV series. The frontend application is deployed using AWS CloudFront CDN for scalable and fast global delivery.

---

# Technologies Used

## Frontend

- React
- React Router DOM
- React Query
- Material UI (MUI)
- Fetch API
- TypeScript

## Backend / APIs

- TMDB API
- Assignment 1 API
- Authentication API Integration

## Deployment

- AWS S3
- AWS CloudFront CDN
- GitHub

---

# Application Features

## Core Features

### Movie Browsing

- Browse popular movies
- Browse upcoming movies
- Browse TV Series
- Pagination on every listing page
- Search with multi optional form
- Fantasy movie creation with protected route
- Favorite movie/TV series
- View detailed movie information
- View Cast list and detailed biography with filmography

### Routing

- Multiple React routes implemented
- Parameterised routes for movie details
- Navigation between pages using React Router

### Search and Filtering

- Search movies using multiple criteria
- Filter by genre

### Favourites

- Add/remove favourite movies/TV series

### Fantasy Movies

Users can create custom fantasy movie records including:

- Title
- Overview
- Genres
- Release date
- Runtime
- Production companies
- Cast details
- Poster upload

### Additional Data Entities

- Actors
- TV Series
- Upcoming
- Fantasy
- Search

### Pagination

- Pagination implemented for all the listing pages

### Authentication

- Sign-in integration using backend authentication API
- Public and private route support

### Reviews Persistence

- Movie reviews persisted in localstorage

---

# Application Pages

| Page               | Description                          |
| ------------------ | ------------------------------------ |
| Home Page          | Displays featured/popular movies     |
| Movie Details      | Displays detailed movie information  |
| Actor Details      | Displays actor biography and details |
| TV Series Page     | Displays TV series data              |
| Favourites Page    | Displays favourite movies and actors |
| Fantasy Movie Page | Create custom fantasy movies         |
| Search Modal       | Search using multi criteria          |
| Login Page         | User authentication                  |

---

# Assignment 1 Integration

The application integrates backend APIs developed in Assignment 1.

Integrated functionality includes:

- Authentication API
- Protected routes

---

# AWS CloudFront Deployment

The frontend application was deployed using AWS CloudFront CDN.

## Deployment Architecture

React Frontend → AWS S3 Bucket → AWS CloudFront CDN

## Deployment Steps

1. Created a production build using:

```bash
npm run build
```

2. Uploaded build files to AWS S3 bucket.

3. Created CloudFront distribution.

4. Configured Origin Access Control (OAC).

5. Configured `index.html` as the default root object.

6. Configured custom error handling for React routing.

7. Deployed frontend globally using CloudFront CDN.

## Benefits of CloudFront

- Faster content delivery
- Reduced latency
- Edge caching
- HTTPS support
- Improved scalability
- Better frontend performance

---

# Project Structure

```text
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── contexts/
 ├── api/
 ├── types/
 ├── images/
 ├── data/
 └── api/
```

---

# Installation and Setup

## Clone Repository

```bash
git clone https://github.com/albertef/labMoviesApp.git
```

## Navigate to Project Folder

```bash
cd labMoviesApp
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

---

# API Configuration

Create a `.env` file in the project root.

Example:

```env
VITE_TMDB_KEY=YOUR_API_KEY
VITE_BACKEND_API_BASE=YOUR_BACKEND_API
```

---

# GitHub Repository

## Frontend Repository

```text
https://github.com/albertef/labMoviesApp.git
```

---

# YouTube Demonstration Video

Add your YouTube video URL here:

```text
https://www.youtube.com/watch?v=pa3LCg3Lr44
```

---

# AI Usage Documentation

## AI Tools Used

- ChatGPT
- GitHub Copilot

## AI Usage Documentation: Specification-Driven Development (SDD)

**AI Tool Used:** GitHub Copilot
**Scope of Use:** Full lifecycle support for the entire SDD process, including the generation and refinement of planning and validation artifacts.

### 1. Automated Specification Generation (spec.md)

GitHub Copilot was used to draft the initial feature specification by translating high-level Assignment 2 requirements into structured functional goals.

- **Tasks Assisted:** Defining the four core units of work (New Entity Views, Search/Pagination, Fantasy Movie, Backend Integration) and establishing clear In-Scope/Out-of-Scope boundaries.
- **Influence:** Helped structure success metrics and proof artifacts, ensuring requirements such as data hyperlinking and parameterised routes were expressed as verifiable outcomes.

### 2. Structured Task Planning (tasks.md)

Copilot was used to convert the feature specification into a technical implementation plan based on SDD patterns.

- **Tasks Assisted:** Generating parent tasks representing demoable units of work and detailed subtasks with clear completion criteria.
- **Influence:** Helped sequence implementation so foundational systems (e.g., auth context) were completed before dependent features (e.g., backend persistence). It also mapped refactoring needs in `tmdb-api.ts` and `MoviesContext.tsx`.

### 3. Validation and Audit Documentation (audit.md)

Copilot assisted in creating an audit trail to support requirement traceability and alignment with higher grading criteria.

- **Tasks Assisted:** Mapping final implementation features back to the original specification.
- **Influence:** Supported creation of validation coverage ensuring requirements such as private routes, multi-criteria search, and caching behaviour were manually verified against defined proof artifacts.

### 4. Review, Editing, and Validation

While GitHub Copilot provided initial structure and drafts for SDD artifacts, all outputs were manually reviewed, edited, and validated.

- **Validation Process:** All AI-generated subtasks were checked against TypeScript strict mode and repository architecture standards.
- **Technical Understanding:** All design decisions (e.g., React Query pagination, form handling for fantasy movie cast) were independently understood and verified for interview readiness.

---

# Challenges Faced

Some challenges encountered during development included:

- Managing React state efficiently
- Implementing protected routes
- Integrating backend authentication
- Configuring CloudFront deployment
- Handling React Router refresh issues on CloudFront
- Implementing pagination and filtering together

These challenges were resolved through debugging, testing, documentation review, and incremental development.

---

# Conclusion

This assignment demonstrates the development of a modern React Single Page Application integrating frontend technologies, backend APIs, routing, authentication, state management, AWS deployment, and CDN delivery.

The project expanded significantly beyond the original lab application by introducing additional entities, enhanced functionality, cloud deployment, and full-stack integration concepts.
