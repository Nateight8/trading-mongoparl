## Risk Management Fields for a Trading Journal App

These fields help traders define and stick to solid risk management practices.

### Basic Fields

| Field                             | Purpose / Description                                                  |
| --------------------------------- | ---------------------------------------------------------------------- |
| **Account Balance** ✅            | Used to calculate % risk per trade                                     |
| **Risk per Trade (%)** ✅         | Common values: 0.5%, 1%, 2% — keeps losses controlled                  |
| **Max Daily Risk (%)** ✅         | Limits how much user can lose per day (e.g., 3%)                       |
| **Max Weekly Risk (%)**(v2)       | Prevents large weekly drawdowns                                        |
| **Max Open Trades**✅             | Limits number of positions at a time (e.g., 3 trades max)              |
| **Risk-to-Reward Ratio (R:R)** ✅ | Preferred R:R (e.g., minimum 2:1)                                      |
| **Stop-Loss Rule**(v2)            | _Dropdown_: Fixed pips, ATR-based, Structure-based                     |
| **Take-Profit Rule** (v2)         | _Dropdown_: Fixed pips, R:R-based, Key level-based                     |
| **Position Sizing Method**(v2)    | _Dropdown_: Fixed lot, % risk per trade, Manual                        |
| **Lot Size Calculator**(v2)       | Tool to calculate position size from SL & risk %                       |
| **Daily Loss Limit Trigger**(v2)  | Set a % threshold to stop trading if hit                               |
| **Risk Category Tags**            | E.g., High Risk / Conservative / A+ Setup — used in journaling context |

### Optional / Advanced Fields

| Field                             | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| **Trade Confidence Rating (1–5)** | Helps adjust risk based on conviction            |
| **Risk Tolerance Profile**        | _Dropdown_: Conservative / Moderate / Aggressive |
| **Slippage Control**              | Add buffer for live market execution             |
| **Equity Stop**                   | "If equity drops to $X, stop trading" failsafe   |

# ✅ TRADING MONGOPARK — MVP Risk Settings Fields

These are the fields I will implement now (mvp v1). Others marked (v2) will come in future releases.

---

## ✅ Fields to Implement in V1:

### 1. **Account Balance**

- **Purpose:** Used to calculate percentage-based risk.
- **Example:** $10,000 account → 1% risk = $100

### 2. **Risk per Trade (%)**

- **Purpose:** Controls risk per position.
- **Common Values:** 0.5%, 1%, 2%

### 3. **Max Daily Risk (%)**

- **Purpose:** Sets a daily risk ceiling.
- **Example:** Max 3% → After losing 3% total in a day, disable trade logging or trigger a warning.

### 4. **Max Open Trades**

- **Purpose:** Restricts number of trades user can open concurrently.
- **Example:** Max 3 trades at any given time.

### 5. **Risk-to-Reward Ratio (R:R)**

- **Purpose:** Default/target R:R per setup.
- **Example:** Minimum 2:1 R:R, configurable by user.

---

## 🕗 Future Enhancements (V2):

> These will be introduced in future releases to enrich the risk engine:

- **Max Weekly Risk (%)**
- **Stop-Loss Rule**
  - Dropdown: Fixed pips, ATR-based, Structure-based
- **Take-Profit Rule**
  - Dropdown: Fixed pips, R:R-based, Key level-based
- **Position Sizing Method**
  - Dropdown: Fixed lot, % risk per trade, Manual
- **Lot Size Calculator**
- **Daily Loss Limit Trigger**
- **Risk Category Tags**
  - E.g., “High Risk”, “Conservative”, “A+ Setup” — used to classify trades in journal

---

## Suggestions

✅ With this V1 setup:

- You can **calculate real-time lot size suggestions** during trade journaling (even if the calculator UI comes later).
- You have **risk management enforcement logic** from Day 1 — which aligns with your goal of reducing drawdown surprises.
