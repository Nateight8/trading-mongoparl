# Data Feed Handling & Sorting Strategy

This document outlines the approach for fetching, sorting, and managing time-series data feeds (such as account balances, P&L, ROI, etc.) from the database for use in the frontend trading analytics dashboard.

---

## 1. Data Fetching: Apollo Client

- **Apollo Client** is used to fetch data from the backend GraphQL API.
- Data is requested with variables for the desired time period (e.g., day, week, month, year).
- Apollo Client manages server data, caching, and updates.

**Example:**

```tsx
const { data, loading, error } = useQuery(GET_ACCOUNT_DATA, {
  variables: { period },
});
```

---

## 2. Time Period Selection: Redux

- The selected time period (e.g., daily, weekly, monthly, yearly) is managed globally using **Redux**.
- This allows all relevant components (accounts, overview, charts) to stay in sync with the user's selection.
- The Redux store holds the current period, and components read from it using `useSelector`.

**Example:**

```ts
// Redux slice
{
  selectedPeriod: "day"; // or 'week', 'month', 'year'
}
```

---

## 3. Data Sorting & Grouping

- **Preferred:** The backend should aggregate and group data by the requested period (day, week, month, year) before sending it to the frontend.
- **Alternative:** If the backend returns raw data, the frontend will group and sort the data using date utilities (e.g., `date-fns`, `dayjs`).
- The frontend ensures data is sorted chronologically for correct chart rendering.

**Example (Frontend Grouping):**

```ts
import { startOfWeek, format, parseISO } from "date-fns";

const groupedByWeek = data.reduce((acc, item) => {
  const week = format(startOfWeek(parseISO(item.date)), "yyyy-MM-dd");
  acc[week] = acc[week] || [];
  acc[week].push(item);
  return acc;
}, {});
```

---

## 4. Component Usage

- Components (charts, tables, etc.) receive sorted/aggregated data as props.
- They render according to the selected period, which is read from Redux.
- When the user changes the period, Redux updates, triggering a new Apollo query and/or data transformation.

---

## 5. Summary

- **Apollo Client**: Fetches and caches server data.
- **Redux**: Manages UI state (selected period) globally.
- **Backend**: Should aggregate/group data if possible.
- **Frontend**: Can group/sort if needed, always sorts data chronologically for charts.

This approach ensures a scalable, maintainable, and consistent data flow for all analytics and charting features in the app.
