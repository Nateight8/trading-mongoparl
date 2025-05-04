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

### Chart Data Feed Simulation

The analytics charts use a realistic simulated data feed to represent a trader's portfolio performance over time. Each data point includes:

- `actual`: The realized outcome for the trader (e.g., closed early, BE, full win, or loss)
- `projected`: The potential outcome if the trade had run to the optimal target (e.g., 1:5RR), or how it would have evolved if left open

This allows the chart to visually compare what the trader actually took out of the market versus what was possible, simulating real trading decisions and market behavior.

**Sample Data Feed:**

```js
[
  { month: "2021-01-01", actual: 500, projected: 500 }, // BE
  { month: "2021-01-02", actual: 700, projected: 1200 }, // Early exit, could have run
  { month: "2021-01-03", actual: 1200, projected: 2000 }, // Partial win, could have run
  { month: "2021-01-04", actual: 2000, projected: 2500 }, // Full win
  { month: "2021-01-05", actual: 1800, projected: 1800 }, // Loss, both drop
  { month: "2021-01-06", actual: 2200, projected: 3500 }, // Win, left some on table
  { month: "2021-01-07", actual: 2500, projected: 2500 }, // BE
  { month: "2021-01-08", actual: 3500, projected: 5000 }, // Big win, could have run more
  { month: "2021-01-09", actual: 4000, projected: 4000 }, // Full win
  { month: "2021-01-10", actual: 3800, projected: 3800 }, // Loss, both drop
  { month: "2021-01-11", actual: 4200, projected: 6000 }, // Win, left some on table
  { month: "2021-01-12", actual: 6000, projected: 8000 }, // Big win, could have run more
  { month: "2021-01-13", actual: 8000, projected: 8000 }, // Full win
  { month: "2021-01-14", actual: 7000, projected: 7000 }, // Loss, both drop
  { month: "2021-01-15", actual: 6500, projected: 7000 }, // Small win, projected higher
  { month: "2021-01-16", actual: 6000, projected: 6000 }, // BE
  { month: "2021-01-17", actual: 5800, projected: 5800 }, // Loss, both drop
  { month: "2021-01-18", actual: 5400, projected: 5600 }, // Small loss, projected slightly higher
];
```

- This data is used in the portfolio overview chart and can be extended for other analytics features.

## Optional (Stretch) Features

- Tagging system (strategy, emotion, market condition)
- Upload trade screenshots
- Export journal (CSV/PDF)

## User Flows

- Sign up or log in to access the dashboard
- Log trades manually or via AI chat
- View, filter, edit, or delete journal entries
- Analyze trading performance with charts and stats
