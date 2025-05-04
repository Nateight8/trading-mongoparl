# Client-side (Frontend) MVP: AI-Powered Trading Journal Web App

## Core Features

1. **User Authentication UI**

   - Signup/Login forms (email & password, OAuth)
   - Auth state management and protected routes
   - Dashboard access after login

2. **Trade Entry Logging UI**

   - Form for manual trade entry:
     - Instrument (e.g., EUR/USD)
     - Entry & Exit Price
     - Position Size
     - Date & Time
     - Direction (Buy/Sell)
     - Result (Profit/Loss)
     - Notes or Tags (optional)
   - Validation and user feedback

3. **AI Chat-Based Journaling UI**

   - Chat interface for journaling trades in natural language
   - Display AI suggestions for structured trade logs
   - Allow user to confirm or edit AI-generated logs

4. **Journal History UI**

   - List view of previous trades
   - Edit or delete entries
   - Basic filters: by date, result, or tag

5. **Basic Analytics UI**
   - Display trade count, win rate, average risk/reward
   - Simple charts (equity curve, win/loss ratio)

## Optional (Stretch) Features

- Tagging system (strategy, emotion, market condition)
- Upload trade screenshots
- Export journal (CSV/PDF)

## User Flows

- Sign up or log in to access the dashboard
- Log trades manually or via AI chat
- View, filter, edit, or delete journal entries
- Analyze trading performance with charts and stats
