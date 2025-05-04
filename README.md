# AI-Powered Trading Journal Web App

## Project Overview

This project is an AI-powered trading journal web application designed to help traders log, review, and analyze their trades with ease. The app leverages natural language processing to make journaling trades as intuitive as chatting, while providing structured analytics and insights to improve trading performance.

## MVP Breakdown

### Server-side (Backend) MVP

1. **User Authentication API**

   - Endpoints for signup/login (email & password, OAuth)
   - Session management and secure authentication
   - User data storage and retrieval

2. **Unified User Onboarding API**

   - After authentication, users complete onboarding in a single step
   - Onboarding collects:
     - Trading account details (name, broker, currency, size, drawdown limits)
     - Risk settings (risk per trade, max daily risk, max open trades, risk/reward ratio)
     - Trading plan (style, sessions, plan note)
   - All onboarding data is saved atomically and user is marked as onboarded

3. **Trade Entry API**

   - Endpoints to create, read, update, and delete trade entries
   - Support for manual and AI-assisted trade journaling

4. **Analytics API**

   - Endpoints to fetch trade statistics, performance, and risk analytics

5. **Security & Session Management**
   - Secure session handling for all endpoints
   - Protected routes for authenticated users only

### Client-side (Frontend) MVP

See `frontend/web/MVP.md` for details.

## Roadmap

- AI-powered journaling and suggestions
- Advanced analytics and charting
- Multi-account support
- Social/trader sharing features

---

**Note:** The onboarding flow is now a single, atomic step after authentication, replacing the previous multi-step account creation process.

## Getting Started

1. Clone the repo and install dependencies for both frontend and backend.
2. Set up your environment variables as described in the respective `.env.example` files.
3. Run the backend and frontend servers.
4. Sign up, log trades, and start journaling with AI assistance!

---

**Built with:** Next.js, Apollo GraphQL, Express, Passport, and OpenAI (for AI journaling).
