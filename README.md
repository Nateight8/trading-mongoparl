# AI-Powered Trading Journal Web App

## Project Overview

This project is an AI-powered trading journal web application designed to help traders log, review, and analyze their trades with ease. The app leverages natural language processing to make journaling trades as intuitive as chatting, while providing structured analytics and insights to improve trading performance.

## MVP Breakdown

### Server-side (Backend) MVP

1. **User Authentication API**

   - Endpoints for signup/login (email & password, OAuth)
   - Session management and secure authentication
   - User data storage and retrieval

2. **Trade Entry API**

   - Endpoints to create, read, update, and delete trade entries
   - Data validation and persistence (instrument, prices, size, date/time, direction, result, notes/tags)

3. **AI Integration API**

   - Endpoint for AI-powered trade journaling (parsing natural language input)
   - AI suggestion/confirmation workflow

4. **Journal History API**

   - Endpoints to fetch, filter, edit, and delete trade logs
   - Filtering by date, result, or tag

5. **Analytics API**

   - Endpoints to provide trade statistics (count, win rate, risk/reward)
   - Data for charts (equity curve, win/loss ratio)

6. **(Optional/Stretch)**
   - Tagging, screenshot upload endpoints
   - Export (CSV/PDF) endpoints

### Client-side (Frontend) MVP

See [`frontend/web/MVP.md`](frontend/web/MVP.md) for the full client-side MVP feature list and details.

## Roadmap

- [x] User authentication (email/password, OAuth)
- [x] Manual trade entry and journal history
- [x] AI chat-based journaling
- [ ] Basic analytics and charts
- [ ] Filtering and editing journal entries
- [ ] Tagging and screenshot uploads (stretch)
- [ ] Export functionality (CSV/PDF) (stretch)

## Getting Started

1. Clone the repo and install dependencies for both frontend and backend.
2. Set up your environment variables as described in the respective `.env.example` files.
3. Run the backend and frontend servers.
4. Sign up, log trades, and start journaling with AI assistance!

---

**Built with:** Next.js, Apollo GraphQL, Express, Passport, and OpenAI (for AI journaling).
